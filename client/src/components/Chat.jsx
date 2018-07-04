import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1"
  },
  messageArea: {
    flexGrow: "1",
    overflow: "auto"
  },
  input: {
    flexGrow: "0",
    alignSelf: "flex-end"
  }
};

const Message = ({ user, date, text }) => {
  return (
    <div
      style={{ minHeight: "min-content" }}
      className="message card my-1 px-3 py-2"
    >
      <h5>{user}:</h5>
      <p>{text}</p>
      <hr className="mt-0 pt-0" />
      <small>{date.toString()}</small>
    </div>
  );
};

const fakeMessages = [
	
  { user: "Mrcooldude", message: "Hahaha", date: new Date(), id: 10 },
	{ user: "emil", message: "mhmmm!", date: new Date(), id: 5 },
  { user: "Mrcooldude", message: "Hahaha", date: new Date(), id: 4 },
  { user: "emil", message: "mhmmm!", date: new Date(), id: 6 },
  { user: "emil", message: "blargh hahahah!", date: new Date(), id: 1 },
  { user: "herdu", message: "Vad säger du?", date: new Date(), id: 2 },
  {
    user: "NiceGuy",
    message: "Nej men nu får du sluta... Jag orkar inte",
    date: new Date(),
    id: 3
  },
  { user: "Mrcooldude", message: "Hahaha", date: new Date(), id: 9 },
  { user: "emil", message: "mhmmm!", date: new Date(), id: 7 }
];

const Chat = () => {
  return (
    <div style={styles.container} className="bg-light p-2">
      <div
        style={styles.messageArea}
        id="message-area "
        className="d-flex flex-column "
      >
        {fakeMessages.map(msg => (
          <Message
            key={msg.id}
            user={msg.user}
            text={msg.message}
            date={msg.date}
          />
        ))}
      </div>
      <div className="mt-2">
        <textarea className="form-control" rows="5" />
      </div>
    </div>
  );
};

export default Chat;
