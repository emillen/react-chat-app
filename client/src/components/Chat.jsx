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

const Chat = ({ name, messages }) => {
  return (
    <div style={styles.container} className="bg-light p-2">
      <h2 className="text-center border p-3 bg-white">{name}</h2>
      <div
        style={styles.messageArea}
        id="message-area "
        className="d-flex flex-column "
      >
        {messages &&
          messages.map(msg => (
            <Message
              key={msg.id}
              user={msg.user}
              text={msg.message}
              date={msg.date}
            />
          ))}
      </div>
      <div className="mt-2">
        <textarea
          placeholder="Write your message here..."
          className="form-control border-primary"
          rows="3"
          style={{ resize: "none" }}
          onSubmit={() => console.log("submitted")}
        />
      </div>
    </div>
  );
};

export default Chat;
