const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Ensure database is connected before handling any API request (crucial for Vercel serverless functions)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed. Please check MongoDB Atlas connection & environment variables.",
      error: error.message,
    });
  }
});

const recipeRoutes = require("./recipeRoutes");

app.use("/api/recipe", recipeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Recipe Generator API is running",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
}

// In local environment, listen on PORT. In Vercel serverless, Vercel invokes app directly.
if (!process.env.VERCEL) {
  startServer();
}

module.exports = app;