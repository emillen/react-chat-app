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

const ChatListMenu = ({ onChange, value }) => (
  <div className="p-2 d-flex">
    <div style={{ flexGrow: 2 }}>
      <input
        placeholder={"Filter..."}
        className="form-control border border-primary"
        onChange={onChange}
        value={value}
      />
    </div>
    <div className="ml-2">
      <a href="/menu" className="btn btn-primary text-dark bg-white">
        +
      </a>
    </div>
  </div>
);

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = { searchString: "", menuModalOpen: false };
  }

  render() {
    return (
      <div
        className="border-right border-dark "
        style={{ height: "100%", maxHeight: "100%"}}
      >
        <ChatListMenu
          value={this.state.searchString}
          onChange={e => this.setState({ searchString: e.target.value })}
        />
        <div
          style={{ maxHeight: "100%", overflowY: "auto" }}
          className="list-group"
        >
          {this.props.list
            .filter(chat =>
              chat.name
                .toLowerCase()
                .includes(this.state.searchString.toLowerCase())
            )
            .sort((a, b) => {
              return ("" + a.name).localeCompare(b.name);
            })
            .map(chat => (
              <ChatListItem
                key={chat._id}
                title={chat.name}
                active={chat._id === this.props.activeChat}
                onclick={() => {
                  this.props.displayChat(chat._id);
                  this.setState({ searchString: "" });
                }}
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
