import { ERROR, ERROR_CLEAR } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case ERROR:
      return action.error;
    case ERROR_CLEAR:
      return false;
    default:
      return state;
  }
};
