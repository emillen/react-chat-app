import { GET_CHAT_LIST, GET_CHAT_LIST_SUCESS, NEW_CHAT } from "./types";

export const getChatList = () => {
  return {
    type: GET_CHAT_LIST
  };
};

export const getChatListSuccess = (chatList) => {
  return {
		type: GET_CHAT_LIST_SUCESS,
		chatList
  };
};

export const newChat = chat => {
  return {
		type: NEW_CHAT,
		chat
  };
};
