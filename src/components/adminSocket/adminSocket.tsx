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
  const [formData, setFormData] = useState({
    message: "",
    user: "",
  });

  const socketFn = async () => {
    await fetch("/api/socket", {
      method: "POST",
      body: formData,
    });
    // socket = io();

    // socket.on("receive-message", (data) => {
    //  console.log('data',data)
    // });
  };

  useEffect(() => {
    socket.on("message2", (data) => {
      console.log("Recieved from SERVER ::", data);
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

    if (formData.message === "" || formData.user === "")
      return Alert(`All inputs must be field`, "Error");

    await socketFn()

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

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Send Meessage</h1>
      <form action="" className={styles.form}>
        <input
          type="text"
          placeholder="title"
          name="message"
          id="message"
          //   value={formData.message}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="desc"
          name="user"
          id="user"
          //   value={formData.user}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Send Message</button>
      </form>
    </div>
  );
};

export default AdminSocket;
