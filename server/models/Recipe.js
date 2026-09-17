const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        prepTime: String,
        cookTime: String,
        servings: String,
        difficulty: String,
        ingredients: [String],
        instructions: [String],
        tips: [String],
        isFavorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Recipe", recipeSchema);