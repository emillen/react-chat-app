import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
