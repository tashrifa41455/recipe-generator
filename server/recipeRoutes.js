const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Recipe = require("./models/Recipe");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error("Fetching recipes error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recipes.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { dish } = req.body;

    if (!dish || !dish.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a dish name.",
      });
    }

    const prompt = `
You are a professional recipe assistant.

Create a practical and easy-to-follow recipe for:
${dish}

Return ONLY valid JSON in exactly this structure:

{
  "name": "Recipe name",
  "description": "Short description",
  "prepTime": "Preparation time",
  "cookTime": "Cooking time",
  "servings": "Number of servings",
  "difficulty": "Easy, Medium, or Hard",
  "ingredients": [
    "ingredient with quantity"
  ],
  "instructions": [
    "step 1",
    "step 2"
  ],
  "tips": [
    "helpful cooking tip"
  ]
}

Do not use markdown.
Do not put the JSON inside code fences.
Make the recipe suitable for home cooking.
`;

    // Candidate models in order of preference
    const candidateModels = ["gemini-3.6-flash", "gemini-3.5-flash"];
    let text = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          text = result.response.text().trim();
          break;
        } catch (genError) {
          lastError = genError;
          console.warn(
            `Attempt ${attempt} on ${modelName} failed: ${genError.message}`
          );
          // If 503 (high demand) or 429 (rate limit), wait 1.5s before retry
          const isTemporary =
            genError.message?.includes("503") ||
            genError.message?.includes("429") ||
            genError.message?.includes("high demand");
          if (isTemporary && attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
          } else {
            break; // Switch to next candidate model
          }
        }
      }
      if (text) break;
    }

    if (!text) {
      throw lastError || new Error("All AI models are currently unavailable.");
    }

    let recipe;

    try {
      recipe = JSON.parse(text);
    } catch (parseError) {
      const cleanedText = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      recipe = JSON.parse(cleanedText);
    }

    const savedRecipe = await Recipe.create(recipe);

    res.json({
      success: true,
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("Recipe generation error:", error.message);

    const isHighDemand =
      error.message?.includes("503") || error.message?.includes("high demand");

    res.status(isHighDemand ? 503 : 500).json({
      success: false,
      message: isHighDemand
        ? "AI service is currently experiencing high demand. Please wait a few seconds and try again."
        : "Unable to generate recipe right now.",
      error: error.message,
    });
  }
});

// Delete recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });
    }

    res.json({
      success: true,
      message: "Recipe deleted successfully.",
      recipeId: id,
    });
  } catch (error) {
    console.error("Delete recipe error:", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to delete recipe.",
    });
  }
});

// Toggle favorite status by ID
router.patch("/:id/favorite", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });
    }

    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();

    res.json({
      success: true,
      message: recipe.isFavorite
        ? "Added to favorites."
        : "Removed from favorites.",
      recipe,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to update favorite status.",
    });
  }
});

module.exports = router;