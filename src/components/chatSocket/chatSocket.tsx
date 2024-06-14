// @ts-nocheck
"use client";
import styles from "./chatSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Image from "next/image";

const socket = io("http://localhost:3000");

const ChatSocket = ({ user, users }) => {
  const { username, id } = user;
  const [sender, setSender] = useState("");
  const [chatId, setChatId] = useState("");
  const [liveUsers, setLiveUsers] = useState([]);
  const [message, setMessage] = useState();
  const [allMessages, setAllMessages] = useState([]);
  const liveUserIds = liveUsers.map((item) => item.userId);
  const filteredUsers = users?.data
    .filter((user: any) => id !== user._id)
    .map((user) => {
      if (liveUserIds.indexOf(user._id) >= 0) {
        return { ...user, online: true };
      } else {
        return { ...user, online: false };
      }
    });

  const socketFn = async () => {
    console.log("sokect");
    socket.on("private-message", (data) => {
      console.log("data", data);
      setAllMessages((prevState) => [...prevState, data]);
    });
    socket.emit("new-user-add", { userId: id, name: username });
    socket.on("get-users", (data) => {
      // console.log('triggered CLIENT SIDE GET USERS', data)
      setLiveUsers(data);
    });
  };

  useEffect(() => {
    socketFn();
    return () => {
      socket.emit("offline");
    };
  }, []);

  const chooseChat = (chatId: string) => {
    console.log("chatId", chatId);
    setChatId(chatId);
  };

  console.log("allMessages", allMessages);
  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    console.log("okida se");
    event.preventDefault();
    setSender(username);
    // socket.emit("send-message", {
    //   id,
    //   username,
    //   message,
    // });
    if (chatId) {
      socket.emit("private-message", {
        content: message,
        to: chatId,
        username,
      });
      setAllMessages((prevState) => [
        ...prevState,
        { content: message, username },
      ]);

      setMessage("");
    } else {
      Alert(`Please select a user to chat with`, "Error");
    }
  };

  return (
    <div style={{ minHeight: "70vh" }}>
      <h1 style={{ marginBottom: 10 }}>Chat App</h1>
      <div className={styles.container}>
        <div className={styles.chatList}>
          {filteredUsers.map((user: any) => (
            <div className={styles.user} key={user._id}>
              <a href="javascript:void(0)" onClick={() => chooseChat(user._id)}>
                <div className={styles.detail}>
                  <Image
                    src={user.img ? user.img : "/noavatar.png"}
                    alt=""
                    width={50}
                    height={50}
                  />
                  {user.username}
                  <span
                    className={user.online ? styles.online : styles.offline}
                  ></span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className={styles.chatContainer}>
          <h1>User: {username}</h1>

          {allMessages.map(({ content, username }, index) => (
            <div key={index} className={styles.messageContainer}>
              {username !== sender && (
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
                  username !== sender
                    ? styles.messageHolder
                    : styles.messageHolderUser
                }
              >
                {content}
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
              value={message}
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSocket;
