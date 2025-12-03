import express from "express";
import { getExpenses , addExpense, togglePaidStatus, getAllExpenses, deleteExpense} from "../controller/expense.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/addExpense", addExpense);
router.get("/:itineraryId",getExpenses);
router.delete("/delete/:expenseId", deleteExpense);
router.get("/all", getAllExpenses)
router.patch("/toggle/:expenseId", togglePaidStatus);

export default router;
