const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});

// This function runs automatically BEFORE a user is saved to the database
UserSchema.pre("save", async function () {
  // If the password hasn't been changed/created, skip hashing
  if (!this.isModified("password")) return;

  // Since this is an async function, errors are caught automatically.
  // Generate a "salt" (random data to make the hash unique)
  const salt = await bcrypt.genSalt(10);

  // Replace the plain text password with the hashed password
  this.password = await bcrypt.hash(this.password, salt);
});

// We can also attach a custom method here to make logging in super easy later
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // Returns true if the typed password matches the hashed database password
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
