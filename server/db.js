const dns = require("dns");
const mongoose = require("mongoose");

// Fix for Node.js querySrv ECONNREFUSED with MongoDB Atlas
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    // ignore if restricted
}

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not set in environment variables.");
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;