"use client";
import styles from "./chatSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";
import _ from "lodash";
const socket = io("http://localhost:3000");

const ChatSocket = ({ user, users }: any) => {
  const { username, id } = user;
  const messageEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [chatId, setChatId] = useState("");
  const [liveUsers, setLiveUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [numberNotifications, setNumberNotifications] = useState(0);
  const [userNotification, setUserNotification] = useState("");
  const [onReceiveMessage, setOnReceiveMessage] = useState(false);

  const liveUserIds = liveUsers.map((item: any) => item.userID);

  const filteredUsers = users?.data
    .filter((user: any) => id !== user._id)
    .map((user: any) => {
      if (liveUserIds.indexOf(user._id) >= 0) {
        return { ...user, online: true };
      } else {
        return { ...user, online: false };
      }
    });

  const socketFn = async () => {
    socket.on("private-message", (data) => {
      const { content, onlineUsers, fromID, fromUserName } = data;

      let newMessages = {};
      onlineUsers.forEach((user: any) => {
        if (user.userID === fromID) {
          setNumberNotifications((prevState) => prevState + 1);
          setUserNotification(fromUserName);
          setOnReceiveMessage((prevState) => !prevState);
          console.log("User FROM: ADMIR", user.name);
          console.log("FROM: ADMIR", fromID);
          newMessages = {
            fromUser: user.name,
            content,
            fromSelf: false,
          };
          setAllMessages((prevState: any) => [...prevState, newMessages]);
        }
      });
    });
    socket.emit("new-user-add", { userID: id, name: username });
    socket.on("get-users", (data) => {
      setLiveUsers(data);
    });
  };

  useEffect(() => {
    console.log("USE EFFECT SOCKET");
    socketFn();
    return () => {
      socket.emit("offline");
    };
  }, []);

  useEffect(() => {
    console.log("USE EFFECT RECEIPENT");
    if (recipient === userNotification && isOpen) setNumberNotifications(0);
  }, [recipient, onReceiveMessage]);

  useEffect(() => {
    console.log('messageEl',messageEl)
    if (messageEl) {
      messageEl?.current?.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [allMessages])

  const handleChange = (event: React.SyntheticEvent) => {
    const { value }: any = event.target;
    setMessage(value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (chatId && message!=='') {
      socket.emit("private-message", {
        content: message,
        fromUserName: username,
        fromID: id,
        to: chatId,
      });
      setAllMessages((prevState) => [
        ...prevState,
        { content: message, toUser: recipient, fromSelf: true },
      ]);

      setMessage("");
    } else {
      Alert(`Type something`, "Error");
    }
  };

  const chooseChat = (chatId: string, recipientUsername: string) => {
    setIsOpen(true);
    setChatId(chatId);
    setRecipient(recipientUsername);
  };

  // if (messageEl) {
  //   messageEl.current.addEventListener('DOMNodeInserted', event => {
  //     const { currentTarget: target } = event;
  //     target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
  //   });
  // }

  console.log("isOpen", isOpen);
  console.log("onReceiveMessage", onReceiveMessage);

  console.log("recipient", recipient);

  console.log("allMessages", allMessages);
  console.log("----------------------------");
  return (
    <div style={{ minHeight: "70vh" }}>
      <h1 style={{ marginBottom: 10 }}>Chat App</h1>
      <div className={styles.container}>
        <div className={styles.chatList}>
          {filteredUsers.map((user: any) => (
            <div className={styles.user} key={user._id}>
              <button
                className={styles.userListBtn}
                onClick={() => chooseChat(user._id, user.username)}
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
                  {numberNotifications !== 0 &&
                    userNotification === user.username && (
                      <span className={styles.notification}>
                        <span className={styles.notificationNumber}>
                          {numberNotifications}
                        </span>{" "}
                      </span>
                    )}
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
              <div className={styles.scrollableContainer} ref={messageEl}>
                {allMessages?.map(
                  ({ content, fromSelf, toUser, fromUser }, index) => {
                    if (fromSelf === true && toUser === recipient)
                      return (
                        <div key={index} style={{ textAlign: "right" }}>
                          <div className={styles.messageContainerSelf}>
                            {content}
                          </div>
                        </div>
                      );
                    if (fromSelf === false && fromUser === recipient)
                      return (
                        <div key={index}>
                          <div className={styles.imageContainer}>
                            <Image
                              src={user.img ? user.img : "/noavatar.png"}
                              alt=""
                              width={50}
                              height={50}
                              style={{ borderRadius: "50%" }}
                            />
                          </div>
                          <div key={index} className={styles.messageContainer}>
                            <strong>{fromUser}</strong>

                            <div>{content}</div>
                          </div>
                        </div>
                      );
                  }
                )}
              </div>

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
                <button onClick={handleSubmit}>
                  <Image src={"/send.svg"} width={30} height={30} alt={""} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSocket;
