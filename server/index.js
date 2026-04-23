require("dotenv").config(); // Add this at the very top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const requestRoutes = require("./routes/requests");

mongoose.connect("mongodb://127.0.0.1:27017/TeraGeodet");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/requests", requestRoutes);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with that email." });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Sign a JWT containing the user's id and role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Send back the token and basic user info
    res.json({
      token,
      user: {
        id: user._id,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// ─── REGISTER ─────────────────────────────────────────────────────────────────
app.post("/register", async (req, res) => {
  try {
    const { fName, lName, email, password } = req.body;

    // Basic validation
    if (!fName || !lName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email is already taken
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "An account with that email already exists." });
    }

    const newUser = await UserModel.create({ fName, lName, email, password });

    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
