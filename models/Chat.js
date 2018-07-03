const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: { type: String, index: { unique: true } },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [
    { text: String, user: { type: Schema.Types.ObjectId, ref: "User" } }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
