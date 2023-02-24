const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validator: [validator.isEmail, "Please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      // maxLength: [8, "Password cannot exceed 8 characters"],
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("user", userSchema, "user");
