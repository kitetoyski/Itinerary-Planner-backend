import expenseModel from "../model/expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const { itineraryId, title, amount, notes } = req.body;

    const expense = await expenseModel.create({
      itineraryId,
      title,
      amount,
      notes,
      paid: false
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Error adding expense" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const expenses = await expenseModel.find({ itineraryId }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error getting expenses" });
  }
};

export const togglePaidStatus = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await expenseModel.findById(expenseId);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    expense.paid = !expense.paid; // 🔥 flip status
    await expense.save();

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all expenses" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await expenseModel.findByIdAndDelete(expenseId);

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ message: "Error deleting expense" });
  }
};
