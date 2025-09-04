const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password mis required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
