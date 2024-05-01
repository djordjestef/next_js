// @ts-nocheck
"use client";
import { postBlog } from "@/lib/services";
import styles from "./adminPostForm.module.css";
import { Alert } from "react-st-modal";
import { useState } from "react";
import { useFormState } from "react-dom";

const AdminPostForm = ({ userId }) => {
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
  const getFormData = async (event: any) => {
    event.preventDefault();

    if (
      formData.title === "" ||
      formData.desc === "" ||
      formData.slug === "" ||
      formData.userId === ""
    )
      return Alert(`All inputs must be field`, "Error");

    await postBlog(formData).then((res) => {
      if (res.error) {
        Alert(`${JSON.stringify(res.error).replaceAll('"', " ")}`, "Error");
      } else {
        Alert(`Blog has been created successfully`, "Success");
      }
    });
  };
  // const [state, formAction] = useFormState(getFormData, undefined);
  // console.log('state',state)

  console.log("formData", formData);
  return (
    <div>
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
        <button onClick={getFormData}>Create Blog</button>
      </form>
    </div>
  );
};

export default AdminPostForm;
