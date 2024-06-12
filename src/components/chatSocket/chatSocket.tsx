// @ts-nocheck
"use client";
import styles from "./chatSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Image from "next/image";

const socket = io("http://localhost:3000");

const ChatSocket = ({ user, users }) => {
  const { username } = user;
  const [chatUserName, setChatUserName] = useState("");
  const [messageObj, setMessageObj] = useState({
    message: "",
  });
  const [allMessages, setAllMessages] = useState([]);

  const socketFn = async () => {
    socket.on("receive-message", (data) => {
      console.log("data", data);
      setAllMessages((pre) => [...pre, data]);
    });
  };

  useEffect(() => {
    socketFn();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageObj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setChatUserName(username);
    if (messageObj.message === "")
      return Alert(`All inputs must be field`, "Error");
    const { message } = messageObj;
    socket.emit("send-message", {
      username,
      message,
    });
    setMessageObj({ message: "" });
  };

  console.log("chatUserName", chatUserName);
  console.log("username", username);
  console.log('allMessages',allMessages)

  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        {users.data?.map((user: any) => (
          <div className={styles.user} key={user._id}>
            <div className={styles.detail}>
              <Image
                src={user.img ? user.img : "/noavatar.png"}
                alt=""
                width={50}
                height={50}
              />
              {user.username}
              <span className={styles.offline}></span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatContainer}>
        <h1 style={{ marginBottom: 10 }}>Chat App</h1>
        <h1>User: {username}</h1>

        {allMessages.map(({ message, username }, index) => (
          <div key={index} className={styles.messageContainer}>
            {username !== chatUserName && (
              <div className={styles.userHolder}>
                <Image
                  src={user.img ? user.img : "/noavatar.png"}
                  alt=""
                  width={50}
                  height={50}
                />
                <br />
                <strong>{username}</strong>
              </div>
            )}

            <div
              className={
                username !== chatUserName
                  ? styles.messageHolder
                  : styles.messageHolderUser
              }
            >
              {message}
            </div>
          </div>
        ))}

        <br />
        <form action="" className={styles.form}>
          <input
            type="text"
            placeholder="message"
            name="message"
            id="message"
            value={messageObj.message}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ChatSocket;
