import mongoose from "mongoose";
import Promise from "bluebird";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);
export default Promise.promisifyAll(Message);
