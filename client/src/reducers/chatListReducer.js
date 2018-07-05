import {
  NEW_CHAT,
  GET_CHAT_LIST_SUCESS,
  GET_CHAT_LIST
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case NEW_CHAT:
      return state.concat(action.chat);
    case GET_CHAT_LIST:
      return state;
    case GET_CHAT_LIST_SUCESS:
      return action.chatList;
    default:
      return state;
  }
};
