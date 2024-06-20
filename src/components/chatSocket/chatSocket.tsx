// @ts-nocheck
"use client";
import styles from "./chatSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Image from "next/image";
import _ from "lodash";

const socket = io("http://localhost:3000");

const ChatSocket = ({ user, users }) => {
  const { username, id } = user;
  const [isOpen, setIsOpen] = useState(false);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  // const [fromTo, setFromTo] = useState("");
  const [chatId, setChatId] = useState("");
  const [liveUsers, setLiveUsers] = useState([]);
  const [message, setMessage] = useState("");
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
    socket.on("private-message", (data) => {
      const { content, username, recipient, onlineUsers } = data;

      let newMessages = {};
      console.log("newMessages", newMessages);
      onlineUsers.forEach((user) => {
        console.log("user.userId", user.userId);
        console.log("recipient", recipient);
        if (user.userId !== recipient.userId) {
          console.log("User found:", user);
          newMessages = {
            fromUser: user.name,
            content,
            fromSelf: false,
          };
          setAllMessages((prevState) => [...prevState, newMessages]);
        }
      });
      // for (let i = 0; i < data.onlineUsers; i++) {

      //   const user = data.onlineUsers[i];
      //   console.log("user", user);
      //   if (user.userId === from) {
      //     console.log("Iteration:", i);
      //     newMessages = {
      //       fromUser: data.onlineUsers[i].name,
      //       content,
      //       fromSelf: false,
      //     };
      //     const messagesList = [...messages, newMessages];
      //     setAllMessages(messagesList);
      //   }
      // }
    });
    socket.emit("new-user-add", { userId: id, name: username });
    socket.on("get-users", (data) => {
      setLiveUsers(data);
    });
  };

  useEffect(() => {
    console.log("USE EFFECT");
    socketFn();
    return () => {
      socket.emit("offline");
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSender(username);

    if (chatId) {
      socket.emit("private-message", {
        content: message,
        to: chatId,
        username,
        // fromTo,
      });
      setAllMessages((prevState) => [
        ...prevState,
        { content: message, toUser: recipient, fromSelf: true },
      ]);

      setMessage("");
    } else {
      Alert(`Please select a user to chat with`, "Error");
    }
  };

  const chooseChat = (
    chatId: string,
    recipientUsername: string,
    senderUsername: string
  ) => {
    setIsOpen(true);
    setChatId(chatId);
    setRecipient(recipientUsername);
    // setFromTo(`${senderUsername}-${recipientUsername}`);
  };

  console.log("allMessages", allMessages);
  return (
    <div style={{ minHeight: "70vh" }}>
      <h1 style={{ marginBottom: 10 }}>Chat App</h1>
      <div className={styles.container}>
        <div className={styles.chatList}>
          {filteredUsers.map((user: any) => (
            <div className={styles.user} key={user._id}>
              <button
                className={styles.userListBtn}
                onClick={() => chooseChat(user._id, user.username, username)}
              >
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
              </button>
            </div>
          ))}
        </div>

        <div className={styles.chatContainer}>
          <h1>Sender: {username}</h1>
          {isOpen && (
            <>
              <h1> {recipient}</h1>

              {allMessages?.map(
                ({ content, username, fromSelf, toUser, fromUser }, index) => {
                  if (fromSelf === true && toUser === recipient)
                    return (
                      <div key={index} className={styles.messageContainer}>
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
                        <div
                          className={
                            username === recipient
                              ? styles.messageHolder
                              : styles.messageHolderUser
                          }
                        >
                          {content}
                        </div>
                      </div>
                    );
                  if (fromSelf === false && fromUser === recipient)
                    return (
                      <div key={index} className={styles.messageContainer}>
                        <div
                          className={
                            username === recipient
                              ? styles.messageHolder
                              : styles.messageHolderUser
                          }
                        >
                          {content}
                        </div>
                      </div>
                    );
                }
              )}

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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSocket;
