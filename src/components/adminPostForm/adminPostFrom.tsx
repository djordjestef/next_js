// @ts-nocheck
"use client";
import { createBlog } from "@/lib/services";
import styles from "./adminPostForm.module.css";
import { Alert } from "react-st-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminPostForm = ({ userId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    slug: "",
    userId: userId,
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (
      formData.title === "" ||
      formData.desc === "" ||
      formData.slug === "" ||
      formData.userId === ""
    )
      return Alert(`All inputs must be field`, "Error");

    await createBlog(formData).then((res) => {
      console.log("res.status", res.status);
      if (res.error) {
        Alert(`${JSON.stringify(res.error).replaceAll('"', " ")}`, "Error");
      } else {
        Alert(`Blog has been created successfully`, "Success");
        router.refresh();
      }
    });
  };

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Add New Blog</h1>
      <form action="" className={styles.form}>
        <input
          type="text"
          placeholder="title"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="desc"
          name="desc"
          id="desc"
          value={formData.desc}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="path"
          name="slug"
          id="slug"
          value={formData.slug}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="userId"
          name="userId"
          id="userId"
          value={userId}
          onChange={handleChange}
          hidden
        />
        <input
          type="text"
          placeholder="image URL"
          name="img"
          id="img"
          value={formData.img}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Create Blog</button>
      </form>
    </div>
  );
};

export default AdminPostForm;
