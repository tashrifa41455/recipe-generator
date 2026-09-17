const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../server/db");
const recipeRoutes = require("../server/recipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", recipeRoutes);

module.exports = async (req, res) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        console.error("API error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};