import React from "react";
import PropTypes from "prop-types";
const fakeChatList = [
  { name: "enchatt", usercount: 0, lastmsg: new Date(), id: 1 },
  { name: "asdasd", usercount: 10, lastmsg: new Date(), id: 2 },
  { name: "qweqwrqwr", usercount: 6, lastmsg: new Date(), id: 3 },
  { name: "afagaga", usercount: 8, lastmsg: new Date(), id: 4 },
  { name: "qweqwetqtsa", usercount: 200, lastmsg: new Date(), id: 5 },
  { name: "xcbxcbsdf", usercount: 3, lastmsg: new Date(), id: 6 },
  { name: "asasd asd asd asd", usercount: 52, lastmsg: new Date(), id: 7 },
  { name: "qweqwetqtsa", usercount: 200, lastmsg: new Date(), id: 8 },
  { name: "xcbxcbsdf", usercount: 3, lastmsg: new Date(), id: 9 },
  { name: "asasd asd asd asd", usercount: 52, lastmsg: new Date(), id: 10 },
  { name: "qweqwetqtsa", usercount: 200, lastmsg: new Date(), id: 11 },
  { name: "xcbxcbsdf", usercount: 3, lastmsg: new Date(), id: 12 },
  { name: "asasd asd asd asd", usercount: 52, lastmsg: new Date(), id: 13 }
];

const ChatListItem = ({ title, active }) => {
  return (
    <a
      className={
        "list-group-item list-group-item-action" +
        (active ? " bg-dark text-light" : "")
      }
    >
      <h5>{title}</h5>
    </a>
  );
};
const ChatList = ({ list }) => (
  <div
    style={{ width: "25vw", overflowY: "scroll" }}
    className="border-right border-dark list-group"
  >
    {list.map(chat => (
      <ChatListItem
        key={chat._id}
        title={chat.name}
        active={chat.name === "en annan chatt"}
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
