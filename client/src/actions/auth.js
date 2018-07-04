import { AUTHENTICATE, AUTHENTICATION_SUCCESS, LOGOUT } from "./types";

export const authenticate = () => {
  return {
    type: AUTHENTICATE
  };
};

export const success = token => {
  return {
    type: AUTHENTICATION_SUCCESS,
    token
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

