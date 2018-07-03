const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, index: { unique: true } },
  email: { type: String, index: { unique: true } },
  passwordHash: String,
  joined: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
