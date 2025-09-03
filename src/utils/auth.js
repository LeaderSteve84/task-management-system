const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "tms_secret_key";                                                                                             
// Hash password
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

// Compare password
const comparePassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

// Generate token
const generateToken = (user) => {
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
