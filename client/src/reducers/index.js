import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import registerReducer from "./registerReducer";
import chatListReducer from "./chatListReducer";
import { combineReducers } from "redux";
import chatReducer from "./chatReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
	register: registerReducer,
	chatList: chatListReducer,
	chat: chatReducer
});
