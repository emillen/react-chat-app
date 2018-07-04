import { AUTHENTICATE, AUTHENTICATION_SUCCESS, ERROR, LOGOUT } from "../actions/types";
const initialState = {
  isAuthenticated:
    !!localStorage.getItem("serverToken") &&
    new Date().getTime() <
      new Date(localStorage.getItem("serverTokenExpiration")).getTime(),
  isInProgress: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      console.log("nu kör vi");
      return Object.assign(
        {},
        { isInProgress: true, isAuthenticated: false, error: false }
      );
    }
    case AUTHENTICATION_SUCCESS: {
      console.log("nu är vi klara");
      return Object.assign(
        {},
        { isInProgress: false, isAuthenticated: true, error: false }
      );
    }
    case LOGOUT: {
      return Object.assign(
        {},
        { isAuthenticated: false, isInProgress: false, error: false }
      );
    }
    case ERROR: {
      console.log("yep");
      return Object.assign(
        {},
        { isInProgress: false, isAuthenticated: false, error: action.error }
      );
    }
    default:
      return state;
  }
};
