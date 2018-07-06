import React, { Component } from "react";
import PropTypes from "prop-types";

const ChatListItem = ({ title, active, onclick }) => {
  return (
    <a
      className={
        "list-group-item list-group-item-action" +
        (active ? " bg-dark text-light" : "")
      }
      onClick={onclick}
    >
      <h5>{title}</h5>
    </a>
  );
};
class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = { searchString: "" };
  }

  render() {
    return (
      <div className="border-right border-dark ">
        <div className="p-2">
          <input
            placeholder={"Filter..."}
            className="form-control mt-auto border border-primary"
            onChange={e => this.setState({ searchString: e.target.value })}
          />
        </div>
        <div
          style={{ width: "25vw", overflowY: "scroll" }}
          className="list-group"
        >
          {this.props.list
            .filter(chat =>
              chat.name
                .toLowerCase()
                .includes(this.state.searchString.toLowerCase())
            )
            .map(chat => (
              <ChatListItem
                key={chat._id}
                title={chat.name}
                active={chat._id === this.props.activeChat}
                onclick={() => this.props.displayChat(chat._id)}
              />
            ))}
        </div>
      </div>
    );
  }
}

ChatList.propTypes = {
  list: PropTypes.array.isRequired,
  activeChat: PropTypes.string,
  displayChat: PropTypes.func,
  getChatList: PropTypes.func
};

export default ChatList;
