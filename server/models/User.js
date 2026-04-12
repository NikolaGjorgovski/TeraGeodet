const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
