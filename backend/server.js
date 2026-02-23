const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/loginDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Failed ❌", err));

// Login API
// Register API
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists ❌"
      });
    }

    // Create new user
    const newUser = new User({
      email,
      password
    });

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


// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // 🆕 If user not found → create new user
    if (!user) {
      const newUser = new User({ email, password });
      await newUser.save();

      return res.status(201).json({
        message: "Email and Password Saved ✅"
      });
    }

    // 🔐 If user exists → check password
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});