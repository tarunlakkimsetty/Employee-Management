const express = require("express");
const User = require("../models/user");

const router = express.Router();

// ===== REGISTER =====
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists ❌"
      });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return res.status(201).json({
      message: "User Registered Successfully ✅"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

// ===== LOGIN =====
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({ email, password });
      await newUser.save();

      return res.status(201).json({
        message: "Email and Password Saved ✅"
      });
    }

    if (user.password === password) {
      return res.status(200).json({
        message: "Login Successful ✅"
      });
    } else {
      return res.status(401).json({
        message: "Invalid Password ❌"
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

module.exports = router;