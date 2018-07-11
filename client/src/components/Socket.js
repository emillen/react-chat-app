import { Component } from "react";
import PropTypes from 'prop-types';
import io from "socket.io-client";

class Socket extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("serverToken");
    this.state = {
      socket: io({
        query: {
          token
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
      })
    };
    this.joinChannel = this.joinChannel.bind(this);
    this.connect = this.connect.bind(this);
  }

  shouldComponentUpdate(nextProps) {
		console.log(this.state.socket.connected)
    if (nextProps.chatId !== this.props.chatId || !this.state.socket.connected)
      return true;
    else return false;
  }

  componentDidMount() {
    this.connect();
  }

  componentDidUpdate() {
    this.joinChannel(this.state.socket);
  }

  connect() {
    if (!this.state.socket.connected) {
      this.state.socket.connect("/");
      this.state.socket.on("message", message => {
        this.props.recieveMessage(message);
      });
    }
  }

  joinChannel(socket) {
    if (this.props.chatId) {
      socket.emit("join chat", this.props.chatId);
    }
  }

  render() {
    return null;
  }
}

Socket.propTypes= {
	chatId: PropTypes.string
}

export default Socket;
