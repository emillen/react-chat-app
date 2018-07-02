import { FETCH_ME, FETCH_ME_SUCCESS, FETCH_ME_ERROR } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ME:
      return state;
    case FETCH_ME_SUCCESS:
      return action.data;
    case FETCH_ME_ERROR:
      return { error: action.error };
    default:
      return state;
  }
};
