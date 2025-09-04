const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

// Hash password
const hashPassword = async (plainPassword) => {
  if (!plainPassword || typeof plainPassword !== "string") {
    throw new Error("Password must be a non-empty string");
  }
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

// Compare password
const comparePassword = async (plain, hash) => {
  if (!plain || !hash || typeof plain !== "string" || typeof hash !== "string") {
    throw new Error("Invalid password or hash");
  }
  return bcrypt.compare(plain, hash);
};

// Generate token
const generateToken = (user) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not deined in environmental variables");
  }
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
