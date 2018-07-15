import axios from "axios";
import moment from "moment";
import jwtDecode from "jwt-decode";
import Promise from "bluebird";
import { authenticate, authenticationSuccess, logout } from "../actions/auth";
import {
  register as registerAction,
  registerSuccess
} from "../actions/register";
import {
  getChatListSuccess,
  getChatList as getChatListCreator,
  newChat
} from "../actions/chatList";

import { displayChat } from "../actions/chat";
import { error, errorClear } from "../actions/error";

export const authenticateToServer = (dispatch, email, password) => {
  dispatch(authenticate());
  return axios
    .post(
      "/authentication",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(response => response.data)
    .then(data => {
      var exp = jwtDecode(data.token).exp;
      localStorage.setItem("serverToken", data.token);
      localStorage.setItem(
        "serverTokenExpiration",
        moment(exp * 1000).toDate()
      );
      dispatch(errorClear());
			dispatch(authenticationSuccess());
			return data;
    })
    .catch(err => {
			return errorOrLogout(dispatch, err);
    });
};

export const logoutFromServer = dispatch => {
  localStorage.removeItem("serverToken");
  localStorage.removeItem("serverTokenExpiration");
  dispatch(logout());
};

export const register = (dispatch, email, username, password) => {
  dispatch(registerAction());
  return axios
    .post(
      "/authentication/register",
      { email, username, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(data => {
      dispatch(errorClear());
			dispatch(registerSuccess());
			return data;
    })
    .catch(err => {
			return errorOrLogout(dispatch, err);
    });
};

export const getChatList = (dispatch, baseUrl) => {
  const url = baseUrl || "/chats";
  dispatch(getChatListCreator());
  const token = localStorage.getItem("serverToken");
  return axios
    .get(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
    .then(response => response.data)
    .then(chatList => {
      dispatch(errorClear());
			dispatch(getChatListSuccess(chatList));
			return chatList;
    })
    .catch(err => {
      return errorOrLogout(dispatch, err);
    });
};

export const getMyChatList = dispatch => {
  return getChatList(dispatch, "/me/chats");
};

export const chatSearch = (dispatch, searchString) => {
  return getChatList(dispatch, `/chats/?search=${searchString}&filter=joined`);
};

export const getChat = (dispatch, chatId) => {
  const token = localStorage.getItem("serverToken");
  return axios
    .get(`/chats/${chatId}`, {
      headers: { "Content-Type": "application/json", "x-access-token": token }
    })
    .then(response => response.data)
    .then(chat => {
      dispatch(errorClear());
      dispatch(displayChat(chat));
      return chat;
    })
    .catch(err => {
      return errorOrLogout(dispatch, err);
    });
};

export const sendMessage = (dispatch, message, chatId) => {
  const token = localStorage.getItem("serverToken");
  return axios
    .post(
      `/chats/${chatId}`,
      { message },
      {
        headers: { "Content-Type": "application/json", "x-access-token": token }
      }
    )
    .catch(err => {
			return errorOrLogout(dispatch, err);
    });
};

export const addChat = (dispatch, chatName) => {
  const token = localStorage.getItem("serverToken");
  return axios
    .post(
      `/chats`,
      { name: chatName },
      {
        headers: { "Content-Type": "application/json", "x-access-token": token }
      }
    )
    .then(chat => chat.data)
    .then(chat => {
      dispatch(errorClear());
      dispatch(newChat(chat.chat));
      return true;
    })
    .catch(err => {
      return errorOrLogout(dispatch, err);
    });
};

export const joinChats = (dispatch, chatIdList) => {
  return Promise.all(
    chatIdList.map(chatId => {
      return joinChat(dispatch, chatId);
    })
  );
};

export const joinChat = (dispatch, chatId) => {
  const token = localStorage.getItem("serverToken");
  return axios
    .post(
      "/me/chats",
      { chat: chatId },
      {
        headers: { "Content-Type": "application/json", "x-access-token": token }
      }
    )
    .catch(err => {
      return errorOrLogout(dispatch, err);
    });
};

const errorOrLogout = (dispatch, err) => {
  console.dir(err);
  if (err.reponse && err.response.status === 401) {
    return logoutFromServer(dispatch);
  } else {
    dispatch(
      error(
        (err.response.data && err.response.data.message) ||
          err.message ||
          err.response.statusText
      )
    );
	}
	return Promise.reject(err);
};
