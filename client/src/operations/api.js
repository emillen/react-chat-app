import axios from "axios";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { authenticate, authenticationSuccess, logout } from "../actions/auth";
import {
  register as registerAction,
  registerSuccess
} from "../actions/register";
import {
  getChatListSuccess,
  getChatList as getChatListCreator
} from "../actions/chatList";

import { error, errorClear } from "../actions/error";
export const authenticateToServer = (dispatch, email, password) => {
  dispatch(authenticate());
  axios
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
    })
    .catch(err => {
      dispatch(error(err.response.data.message));
    });
};

export const logoutFromServer = dispatch => {
  localStorage.removeItem("serverToken");
  localStorage.removeItem("serverTokenExpiration");
  dispatch(logout());
};

export const register = (dispatch, email, username, password) => {
  dispatch(registerAction());
  axios
    .post(
      "/authentication/register",
      { email, username, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(() => {
      dispatch(errorClear());
      dispatch(registerSuccess());
    })
    .catch(err => {
      console.log(err);
      dispatch(error(err.response.data.message));
    });
};

export const getChatList = dispatch => {
	dispatch(getChatListCreator());
	const token = localStorage.getItem("serverToken")
  axios
    .get(
      "/chat",
      { headers: { "Content-Type": "application/json", "x-access-token": token} }
    )
    .then(response => response.data)
    .then(chatList => {
      dispatch(errorClear());
      dispatch(getChatListSuccess(chatList));
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
};
