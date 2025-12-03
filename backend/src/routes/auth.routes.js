import express from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", (req, res) => {
    res.json({ status: "ok", message: "Backend is connected!" });
  });
export default router;
