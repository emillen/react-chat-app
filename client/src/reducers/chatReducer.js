import { SEND_MESSAGE, DISPLAY_CHAT, RECIEVE_MESSAGE } from "../actions/types";

const initialState = {
	_id: "",
  name: "",
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return state;
    case DISPLAY_CHAT:
      return action.chat;
    case RECIEVE_MESSAGE:
      return Object.assign({}, state, {
        messages: state.messages.concat(action.message)
      });
    default:
      return state;
  }
};
