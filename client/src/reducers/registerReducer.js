import { REGISTER, REGISTER_SUCCESS } from "../actions/types";

const initialState = { inProgress: false, success: false };
export default (state = Object.assign({}, initialState), action) => {
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, initialState, { inProgress: true });
    case REGISTER_SUCCESS:
      return Object.assign({}, initialState, { success: true });
    default:
      return state;
  }
};
