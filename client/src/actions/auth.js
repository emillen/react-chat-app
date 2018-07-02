import { AUTHENTICATE, SUCCESS, ERROR, LOGOUT } from "./types";

export const authenticate = () => {
  return {
    type: AUTHENTICATE
  };
};

export const success = token => {
  return {
    type: SUCCESS,
    token
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const error = errormsg => {
  return {
    type: ERROR,
    error: errormsg
  };
};
