import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1"
  },
  messageArea: {
    flexGrow: "1"
  },
  input: {
    flexGrow: "0",
    alignSelf: "flex-end"
  }
};

const Chat = () => {
  styles.messageArea;
  return (
    <div style={styles.container} className="bg-light ">
      <div style={styles.messageArea} id="message-area " className="">
        hahahaha
      </div>
      <div className="p-2">
        <textarea class="form-control" rows="5" />
      </div>
    </div>
  );
};

export default Chat;
