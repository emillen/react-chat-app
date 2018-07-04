import { REGISTER, REGISTER_SUCCESS } from "./types";

export const register = (email, username, password) => {
  return {
    type: REGISTER,
    email,
    username,
    password
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};
