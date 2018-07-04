import { AUTHENTICATE, AUTHENTICATION_SUCCESS, LOGOUT } from "../actions/types";
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
        { isInProgress: true, isAuthenticated: false }
      );
    }
    case AUTHENTICATION_SUCCESS: {
      console.log("nu är vi klara");
      return Object.assign(
        {},
        { isInProgress: false, isAuthenticated: true }
      );
    }
    case LOGOUT: {
      return Object.assign(
        {},
        { isAuthenticated: false, isInProgress: false}
      );
    }
    default:
      return state;
  }
};
