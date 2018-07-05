import React from "react";
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
const ChatList = ({ list, displayChat, activeChat }) => (
  <div
    style={{ width: "25vw", overflowY: "scroll" }}
    className="border-right border-dark list-group"
  >
    {list.map(chat => (
      <ChatListItem
        key={chat._id}
        title={chat.name}
				active={chat._id === activeChat}
				onclick={() => displayChat(chat._id)}
      />
    ))}
  </div>
);

ChatList.propTypes = {
  list: PropTypes.array.isRequired,
  activeChat: PropTypes.string,
  changeChat: PropTypes.func,
  getChatList: PropTypes.func
};

export default ChatList;
