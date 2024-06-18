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
  const [fromTo, setFromTo] = useState("");
  const [chatId, setChatId] = useState("");
  const [liveUsers, setLiveUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const liveUserIds = liveUsers.map((item) => item.userId);
  const [groupByPriviteChat, setGroupByPriviteChat] = useState({});

  const filteredUsers = users?.data
    .filter((user: any) => id !== user._id)
    .map((user) => {
      if (liveUserIds.indexOf(user._id) >= 0) {
        return { ...user, online: true };
      } else {
        return { ...user, online: false };
      }
    });

  useEffect(() => {
    setGroupByPriviteChat(_.groupBy(allMessages, (row) => row["fromTo"]));
  }, [allMessages]);

  console.log("groupByPriviteChat", groupByPriviteChat);

  const socketFn = async () => {
    socket.on("private-message", (data) => {
      console.log("data", data);
      setFromTo(data.fromTo);
      setSender(data.username);
      setAllMessages((prevState) => [...prevState, data]);
    });
    socket.emit("new-user-add", { userId: id, name: username });
    socket.on("get-users", (data) => {
      setLiveUsers(data);
    });
  };

  useEffect(() => {
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
        fromTo,
      });
      setAllMessages((prevState) => [
        ...prevState,
        { content: message, username, fromTo },
      ]);

      setMessage("");
    } else {
      Alert(`Please select a user to chat with`, "Error");
    }
  };

  console.log("fromTo", fromTo);
  const chooseChat = (
    chatId: string,
    recipientUsername: string,
    senderUsername: string
  ) => {
    setIsOpen(true);
    setChatId(chatId);
    setRecipient(recipientUsername);
    setFromTo(`${senderUsername}-${recipientUsername}`);
  };

  console.log("recipient", recipient);
  console.log("sender", sender);
  // console.log('allMessages',allMessages)

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

              {allMessages?.map(({ content, username }, index) => (
                <div key={index} className={styles.messageContainer}>
                  {username === recipient && (
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
                      username === recipient
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSocket;
