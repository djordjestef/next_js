// @ts-nocheck
"use client";
import styles from "./adminSocket.module.css";
import { Alert } from "react-st-modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/naviga  tion";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const AdminSocket = () => {
  //   const router = useRouter();
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    message: "",
  });
  const [allMessages, setAllMessages] = useState([]);

  const socketFn = async () => {
    // await fetch("/api/socket", {
    //   method: "POST",
    //   body: JSON.stringify({ formData: formData }),
    // });
    // socket = io();

    // socket.on("receive-message", (data) => {
    //  console.log('data',data)
    // });
    socket.on("receive-message", (data) => {
      console.log("data", data);
      setAllMessages((pre) => [...pre, data]);
    });
  };

  useEffect(() => {
    socketFn();
    socket.on("receive-message", (data) => {
      console.log("Recieved from SERVER ::", data);
      //   setAllMessages((pre) => [...pre, data]);
      // Execute any command
    });
  }, [socket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (formData.message === "")
      return Alert(`All inputs must be field`, "Error");
    const { message } = formData;
    socket.emit("send-message", {
      username,
      message,
    });

    // await socketFn();

    // await createBlog(formData).then((res) => {
    //   if (res.error) {
    //     console.log('ERROR FROM BACKEND',res.error)
    //     Alert(`${JSON.stringify(res.error).replaceAll('"', " ")}`, "Error");
    //   } else {
    //     Alert(`Blog has been created successfully`, "Success");
    //     setFormData({ title: "", desc: "", slug: "", userId: userId, img: "" });
    //     router.refresh();
    //   }
    // });
  };

  console.log("allMessages", allMessages);

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Send Meessage</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      {allMessages.map(({ username, message }, index) => (
        <div key={index}>
          {username}: {message}
        </div>
      ))}

      <br />
      <form action="" className={styles.form}>
        {/* <input
          type="text"
          placeholder="title"
          name="message"
          id="message"
          //   value={formData.message}
          onChange={handleChange}
        /> */}
        <input
          type="text"
          placeholder="message"
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Send Message</button>
      </form>
    </div>
  );
};

export default AdminSocket;
