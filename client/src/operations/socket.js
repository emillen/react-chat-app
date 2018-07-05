import io from "socket.io-client";
import { recieveMessage } from "../actions/chat";
import { store } from "../index";
export const startSocket = () => {
  const token = localStorage.getItem("serverToken");
  const socket = io({
    query: {
      token
    }
  });
  socket.connect("/");
  socket.on("message", message => {
    store.dispatch(recieveMessage(message));
  });

  return socket;
};
