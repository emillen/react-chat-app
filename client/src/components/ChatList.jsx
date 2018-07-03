import React from "react";

const fakeChatList = [
  { name: "enchatt", usercount: 0, lastmsg: new Date(), id: 1 },
  { name: "asdasd", usercount: 10, lastmsg: new Date(), id: 2 },
  { name: "qweqwrqwr", usercount: 6, lastmsg: new Date(), id: 3 },
  { name: "afagaga", usercount: 8, lastmsg: new Date(), id: 1 },
  { name: "qweqwetqtsa", usercount: 200, lastmsg: new Date(), id: 4 },
  { name: "xcbxcbsdf", usercount: 3, lastmsg: new Date(), id: 1 },
  { name: "asasd asd asd asd", usercount: 52, lastmsg: new Date(), id: 5 },
  { name: "qweqwetqtsa", usercount: 200, lastmsg: new Date(), id: 4 },
  { name: "xcbxcbsdf", usercount: 3, lastmsg: new Date(), id: 1 },
  { name: "asasd asd asd asd", usercount: 52, lastmsg: new Date(), id: 5 },
  { name: "qweqwetqtsa", usercount: 200, lastmsg: new Date(), id: 4 },
  { name: "xcbxcbsdf", usercount: 3, lastmsg: new Date(), id: 1 },
  { name: "asasd asd asd asd", usercount: 52, lastmsg: new Date(), id: 5 },
];

const ChatListItem = ({ title, usercount, date, active }) => {
  return (
    <a className={"list-group-item list-group-item-action" + (active ? " bg-dark text-light" : "")}>
      <h5>{title}</h5>
      <small>Usercount: {usercount}</small>
    </a>
  );
};

const ChatList = () => {
  return (
    <div style={{ width: "25vw", overflowY:"scroll" }} className="border-right border-dark list-group">
      {fakeChatList.map((chat, i) => (
        <ChatListItem
          title={chat.name}
          usercount={chat.usercount}
					date={chat.lastmsg}
					active={i === 5}
        />
      ))}
    </div>
  );
};

export default ChatList;
