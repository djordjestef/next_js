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
  const [userNotification, setUserNotification] = useState("");
  const [onReceiveMessage, setOnReceiveMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userIsTyping, setUserIsTyping] = useState("");
  const [seenStatus, setSeenStatus] = useState(false);
  const [notifications, setNotifications] = useState<{ [key: string]: number }>(
    {}
  );

  const [userSeenMessage, setUserSeenMessage] = useState("");

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
      const { content, fromUserName } = data;
      let newMessages = {};
      setNotifications((prev) => ({
        ...prev,
        [fromUserName]: (prev[fromUserName] || 0) + 1,
      }));

      setUserNotification(fromUserName);
      setOnReceiveMessage((prevState) => !prevState);

      setUserSeenMessage(fromUserName);

      newMessages = {
        fromUser: fromUserName,
        content,
        fromSelf: false,
      };
      setAllMessages((prevState: any) => [...prevState, newMessages]);
    });

    socket.on("display-typing", (data) => {
      if (data.typing == true && data.selectedUser === username) {
        setIsTyping(true);
        setUserIsTyping(data.userTyping);
      } else {
        setIsTyping(false);
      }
    });

    socket.emit("new-user-add", { userID: id, name: username });
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

  useEffect(() => {
    // allMessages.forEach((message) => {

    socket.emit("message-seen", {
      senderUserName: selectedUser,
      toID: chatId,
      seen: userSeenMessage === selectedUser && isOpen ? true : false,
    });

    // });
  }, [isOpen, selectedUser, userNotification, allMessages]);

  useEffect(() => {
    socket.on("message-seen", ({ senderUserName, seen }) => {
      console.log(" //ovaj use effect samo slusa onaj koji je selectovan");
      setSeenStatus(seen);
      // if (senderUserName === username) {
      //   setSeenStatus(seen);
      // }else {
      //   setSeenStatus(seen)
      // }
    });
  }, [selectedUser, isOpen]);

  useEffect(() => {
    if (selectedUser === userNotification && isOpen) {
      setNotifications((prev) => ({
        ...prev,
        [selectedUser]: 0,
      }));
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

  console.log("seenStatus", seenStatus);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsTyping(false);
    if (chatId && message !== "") {
      socket.emit("private-message", {
        content: message,
        fromUserName: username,
        // fromID: id,
        toID: chatId,
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
    setUserNotification(selectedUserUsername); //because in case more than one user texted to one user, to know what notification should be reset
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

                  {notifications[user.username] > 0 && (
                    <span className={styles.notification}>
                      <span className={styles.notificationNumber}>
                        {notifications[user.username]}
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
                  ({ content, fromSelf, toUser, fromUser }, index, arr) => {
                    if (fromSelf === true && toUser === selectedUser)
                      return (
                        <div key={index} style={{ textAlign: "right" }}>
                          <div className={styles.messageContainerSelf}>
                            {content}
                          </div>
                          {index == arr.length - 1 && (
                            <p>{seenStatus === false ? "delivered" : "seen"}</p>
                          )}
                        </div>
                      );

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
                {isTyping && selectedUser === userIsTyping && (
                  <p className={styles.isTyping}>
                    <strong>{userIsTyping}</strong> is typing...
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
