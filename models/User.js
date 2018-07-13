import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, index: { unique: true } },
  email: { type: String, index: { unique: true } },
  passwordHash: String,
  joined: { type: Date, default: Date.now },
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat"}]
});

const User = mongoose.model("User", userSchema);

export default User;
