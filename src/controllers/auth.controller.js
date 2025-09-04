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
      return res.status(400).json({ error: "Passwords mismatch"});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        { error: "Email already in use" }
      );
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Create new prof. user
    const user = await User.create({
      email,
      password: hashedPassword
    });

    return res.status(200).json({
      message: "User account created successfully.",
    });

  } catch (error) {
    console.error("Account creation error:", error);
    return res.status(500).json(
      { error: "Error creating user account" }
    );
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
