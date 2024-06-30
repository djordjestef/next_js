"use client";
import styles from "./chatSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";
import _ from "lodash";

const socket = io("http://localhost:3000");

const debounceFunction = _.debounce((emitFunction) => {
  emitFunction();
}, 500);

const ChatSocket = ({ user, users }: any) => {
  const { username, id } = user;
  const messageEl = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [chatId, setChatId] = useState("");
  const [liveUsers, setLiveUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [numberNotifications, setNumberNotifications] = useState(0);
  const [userNotification, setUserNotification] = useState("");
  const [onReceiveMessage, setOnReceiveMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [seenStatus, setSeenStatus] = useState(false);

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
          setUserNotification(fromUserName); //admin
          setOnReceiveMessage((prevState) => !prevState);

          newMessages = {
            fromUser: user.name,
            content,
            fromSelf: false,
          };
          setAllMessages((prevState: any) => [...prevState, newMessages]);
        }
      });
    });
    socket.on("display-typing", (data) => {
      if (data.typing == true && data.selectedUser === username) {
        setIsTyping(true);
        setUserNotification(data.userTyping);
        setSeenStatus(true)
      } else {
        setIsTyping(false);
      }
    });

    socket.emit("new-user-add", { userID: id, name: username });
    socket.on("get-users", (data) => {
      setLiveUsers(data);
    });
  };

  console.log('seenStatus',seenStatus)

  useEffect(() => {
    socketFn();
    return () => {
      socket.emit("offline");
    };
  }, []);

  useEffect(() => {
    if (selectedUser === userNotification && isOpen) {
      setNumberNotifications(0);
    }
  }, [selectedUser, onReceiveMessage]);

  useEffect(() => {
    if (messageEl) {
      messageEl?.current?.addEventListener("DOMNodeInserted", (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [allMessages]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsTyping(false);
    if (chatId && message !== "") {
      socket.emit("private-message", {
        content: message,
        fromUserName: username,
        fromID: id,
        to: chatId,
      });
      setAllMessages((prevState) => [
        ...prevState,
        { toUser: selectedUser, content: message, fromSelf: true },
      ]);

      setMessage("");
    } else {
      Alert(`Type something`, "Error");
    }
  };

  const chooseChat = (chatId: string, selectedUserUsername: string) => {
    setIsOpen(true);
    setChatId(chatId);
    setSelectedUser(selectedUserUsername);
  };

  const handleChange = (event: React.SyntheticEvent) => {
    const { value }: any = event.target;
    setMessage(value);
    socket.emit("typing", {
      selectedUser: selectedUser,
      userTyping: username,
      typing: true,
    });
    debounceFunction(() =>
      socket.emit("typing", {
        selectedUser: selectedUser,
        userTyping: username,
        typing: false,
      })
    );
  };

  // console.log('isTyping',isTyping)
  console.log("username", username);
  console.log("------------------------");
  console.log("userNotification", userNotification);
  console.log("selectedUser", selectedUser);
  console.log("------------------------");
  return (
    <div style={{ minHeight: "70vh" }}>
      <div className={styles.container}>
        <div className={styles.chatList}>
          <h3 className={styles.listTitle}>Users List</h3>
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
          <h3 className={styles.messageTitle}>Messages</h3>
          {isOpen && (
            <>
              <h3> {selectedUser}</h3>
              <div className={styles.scrollableContainer} ref={messageEl}>
                {allMessages?.map(
                  ({ content, fromSelf, toUser, fromUser }, index) => {
                    if (fromSelf === true && toUser === selectedUser)
                      return (
                        <div key={index} style={{ textAlign: "right" }}>
                          <div className={styles.messageContainerSelf}>
                            {content}
                          </div>
                          <p>seen</p>
                        </div>
                      );
                    // if (fromSelf && seenStatus) {
                    //   console.log('SEEEN')
                    // };

                    if (fromSelf === false && fromUser === selectedUser)
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
                {isTyping && selectedUser === userNotification && (
                  <p className={styles.isTyping}>
                    <strong>{userNotification}</strong> is typing...
                  </p>
                )}
                <input
                  type="text"
                  placeholder="message"
                  name="message"
                  id="Message..."
                  value={message}
                  onChange={handleChange}
                />
                <button type="submit" onClick={handleSubmit}>
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
