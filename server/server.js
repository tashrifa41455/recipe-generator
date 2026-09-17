const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

if (process.env.VERCEL) {
  connectDB();
} else {
  startServer();
}

module.exports = app;