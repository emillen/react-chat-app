import { Component } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";

class Socket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: io({
        query: {
          token: localStorage.getItem("serverToken")
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
      })
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.chatId !== this.props.chatId) return true;
    else return false;
  }

  componentDidMount() {
    this.state.socket.connect("/");
    this.state.socket.on("message", message => {
      this.props.recieveMessage(message);
      this.state.socket.emit("view chat", this.props.chatId);
    });

    this.state.socket.on("update", chat => {
      this.props.updateChat(chat);
    });
  }
  componentDidUpdate() {
    if (this.props.chatId) {
      this.state.socket.emit("join chat", this.props.chatId);
    }
  }

  render() {
    return null;
  }
}

Socket.propTypes = {
  chatId: PropTypes.string,
  updateChat: PropTypes.func.isRequired
};

export default Socket;
