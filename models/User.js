import mongoose from "mongoose";
import Promise from "bluebird";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, index: { unique: true } },
  email: { type: String, index: { unique: true } },
  passwordHash: String,
  joined: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default Promise.promisifyAll(User);
