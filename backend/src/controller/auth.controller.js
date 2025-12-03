import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email, password: hashed });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
console.log("JWT SECRET in controller:", process.env.JWT);

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT,
      { expiresIn: "30d" }
    );

    res.json({
      message: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
