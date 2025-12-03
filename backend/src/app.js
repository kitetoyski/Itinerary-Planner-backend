import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import itineraryRoutes from "./routes/itinerary.route.js";
import expenseRoutes from "./routes/expense.route.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/itineraries", itineraryRoutes);
app.use("/", expenseRoutes);
app.get("/test", (req, res) => {
    res.json({ status: "ok", message: "Backend is connected!" });
  });

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
