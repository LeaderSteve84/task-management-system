const { validationResult } = require("express-validator");
const User = require("../models/Auth.model");
const { hashPassword, generateToken, comparePassword } = require("../utils/auth");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User account created successfully",
      data: { id: user._id, email: user.email },
    });

  } catch (error) {
    console.error("Account creation error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create user account",
      error: error.message,
    });
  }
};


const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: { id: user._id, email: user.email },
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

module.exports = { register, login };
