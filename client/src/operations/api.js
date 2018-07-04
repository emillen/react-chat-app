import axios from "axios";
import moment from "moment";
import jwtDecode from "jwt-decode";
import {
  authenticate,
  success,
  logout
} from "../actions/auth";

import {error, errorClear} from "../actions/error";
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
      dispatch(success());
    })
    .catch(err => {
      dispatch(error(err.response.data.message));
    });
};

export const logoutFromServer = dispatch => {
  console.log("hejsan");
  localStorage.removeItem("serverToken");
  localStorage.removeItem("serverTokenExpiration");
  dispatch(logout());
};
