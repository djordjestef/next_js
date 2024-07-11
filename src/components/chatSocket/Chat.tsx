"use client";
import styles from "./chatSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect, useRef, startTransition } from "react";
import io from "socket.io-client";
import Image from "next/image";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:3000");

const debounceFunction = _.debounce((emitFunction) => {
  emitFunction();
}, 500);

const ChatSocket = ({ user, users }: any) => {
  const { username, id } = user;
  const messageEl = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [liveUsers, setLiveUsers] = useState<object[]>([]);
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [userNotification, setUserNotification] = useState<string>("");
  const [onReceiveMessage, setOnReceiveMessage] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userIsTyping, setUserIsTyping] = useState<string>("");
  const [notifications, setNotifications] = useState<{ [key: string]: number }>(
    {}
  );
  const [seenMessages, setSeenMessages] = useState<string[]>([]);

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
      const { content, fromUserName, messageId } = data;
      let newMessages = {};
      startTransition(() => {
        setNotifications((prev) => ({
          ...prev,
          [fromUserName]: (prev[fromUserName] || 0) + 1,
        }));
      });

      setUserNotification(fromUserName);
      setOnReceiveMessage((prevState) => !prevState);

      newMessages = {
        messageId,
        fromUser: fromUserName,
        content,
        fromSelf: false,
        seen: false,
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

    socket.on("message-seen", ({ senderUserName, messageIds }) => {
      console.log("EMITOVAN TEK AKO IMA UNSEEN");

      setAllMessages((prevMessages) => {
        console.log("prevMessages", prevMessages);
        return prevMessages.map((msg) =>
          messageIds.includes(msg.messageId) && senderUserName === username
            ? { ...msg, seen: true }
            : msg
        );
      });
    });
  };

  useEffect(() => {
    socketFn();

    return () => {
      socket.emit("offline");
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectedUser) {
      const unseenMessages = allMessages
        .filter((message) => {
          console.log("message", message);
          return message.fromUser === selectedUser && !message.seen;
        })
        .filter((messageId) => {
          console.log("seenMessages", seenMessages);
          return !seenMessages.includes(messageId);
        });

      const messageIds = unseenMessages.map((item) => item.messageId);
      console.log("UNSEENMessages", unseenMessages);

      if (unseenMessages.length > 0) {
        console.log("EMIT");
        socket.emit("message-seen", {
          senderUserName: selectedUser,
          messageIds,
          toID: chatId,
        });
        setSeenMessages((prev) => [...prev, ...unseenMessages]);
      }
    }
  }, [isOpen, selectedUser, chatId, allMessages]);

  // useEffect(() => {
  //   socket.on("message-seen", ({ senderUserName, messageIds }) => {
  //     console.log("EMITOVAN TEK AKO IMA UNSEEN");
  //     console.log('messageIds',messageIds)
  //     setAllMessages((prevMessages) =>
  //       prevMessages.map((msg) =>
  //         messageIds.includes(msg.messageId) && senderUserName === username
  //           ? { ...msg, seen: true }
  //           : msg
  //       )
  //     );
  //   });

  //   return () => {
  //     socket.off("message-seen");
  //   };
  // }, []);

  useEffect(() => {
    if (selectedUser === userNotification && isOpen) {
      startTransition(() => {
        setNotifications((prev) => ({
          ...prev,
          [selectedUser]: 0,
        }));
      });
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
      const messageId = uuidv4();
      socket.emit("private-message", {
        content: message,
        fromUserName: username,
        toID: chatId,
        messageId,
      });
      setAllMessages((prevState) => [
        ...prevState,
        {
          messageId,
          toUser: selectedUser,
          content: message,
          fromSelf: true,
          seen: false,
        },
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
    setUserNotification(selectedUserUsername);

   
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
                  (
                    { content, fromSelf, toUser, fromUser, seen },
                    index,
                    arr
                  ) => {
                   const groupBySelectedUser =_.groupBy(arr,'toUser')
                  //  const last = groupBySelectedUser[toUser].at(-1);
                  //  console.log('last',last)
                    if (fromSelf === true && toUser === selectedUser)
                      return (
                        <div key={index} style={{ textAlign: "right" }}>
                          <div className={styles.messageContainerSelf}>
                            {content}
                          </div>
                          {/* {groupBySelectedUser[toUser].map((item, index,arr)=>{
                            if(index==arr.length-1){
                             return <p key={item.messageId}>{seen ? "seen" : "delivered"}</p>
                            }
                          })} */}
                          
                          {index == arr.length - 1 && (//here is bug 
                          <p>{seen ? "seen" : "delivered"}</p>

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
