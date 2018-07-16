import {
  NEW_CHAT,
  GET_CHAT_LIST_SUCESS,
  GET_CHAT_LIST,
  UPDATE_CHAT
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case NEW_CHAT:
      return state.concat(action.chat);
    case GET_CHAT_LIST:
      return state;
    case GET_CHAT_LIST_SUCESS:
      return action.chatList;
    case UPDATE_CHAT:{
      return state.map(chat => {
        if (chat._id === action.chat._id) {
          return { ...chat ,  ...action.chat };
        } else return { ...chat };
      });}
    default:
      return state;
  }
};
