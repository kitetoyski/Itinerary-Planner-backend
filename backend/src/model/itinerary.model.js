import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  time: String,
  activity: String,
});

const daySchema = new mongoose.Schema({
  day: Number,
  activities: [activitySchema],
});

const locationSchema = new mongoose.Schema({
  location: String,
  days: [daySchema],
});

const expenseSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const itinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  locations: [locationSchema],
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  expenses: [expenseSchema], // <-- embedded expenses
});

export default mongoose.model("Itinerary", itinerarySchema);
