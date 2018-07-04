import { ERROR, ERROR_CLEAR } from "./types";

export const error = error => {
  return {
    type: ERROR,
    error
  };
};

export const errorClear = () => {
  return {
    type: ERROR_CLEAR
  };
};
