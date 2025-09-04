const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { validateUser, validateLogin } = require("../middleware/validators/userValidator");

const router = express.Router();

// Register a new user with validation
router.post("/register", validateUser, register);

// Login a user with validation
router.post("/login", validateLogin, login);

module.exports = router;
