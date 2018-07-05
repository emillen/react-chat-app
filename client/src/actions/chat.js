import { SEND_MESSAGE, RECIEVE_MESSAGE, DISPLAY_CHAT } from "./types";

export const sendMessage = message => {
  return {
    type: SEND_MESSAGE,
    message
  };
};

export const displayChat = chat => {
	return {
		type: DISPLAY_CHAT,
		chat
	}
}
 

export const recieveMessage = message => {
  return {
    type: RECIEVE_MESSAGE,
    message
  };
};
