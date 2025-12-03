import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    itineraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,   // unpaid by default
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
