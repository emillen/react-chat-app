import authReducer from "./authReducer";
import meReducer from "./meReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  me: meReducer
});
