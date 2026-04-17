const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/TeraGeodet");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await UserModel.findOne({ email: email });

    if (user) {
      // 2. Use our custom method to compare the typed password with the database hash
      const isMatch = await user.comparePassword(password);

      if (isMatch) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => {
      // This will print the exact reason it failed to your terminal!
      console.log("Registration Error:", err);
      res.json(err);
    });
});

app.listen(3001, () => {
  console.log("server is running");
});
