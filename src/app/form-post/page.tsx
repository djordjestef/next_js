// @ts-nocheck
"use client";
import { postBlog } from "@/lib/services";
import styles from "./form.module.css";
import { Alert } from "react-st-modal";

const FormPage = () => {
  const getFormData = async (event: any) => {
    event.preventDefault();

    const title = document.getElementById("title")?.value;
    const desc = document.getElementById("desc")?.value;
    const slug = document.getElementById("slug")?.value;
    const userId = document.getElementById("userId")?.value;
    const img = document.getElementById("img")?.value;
    const formData = {
      title,
      desc,
      slug,
      userId,
      img,
    };
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
        Alert(`Blog has been created successfully`, "Error");
      }
    });
  };
  return (
    <div>
      <form action="" className={styles.form}>
        <input type="text" placeholder="title" name="title" id="title" />
        <input type="text" placeholder="desc" name="desc" id="desc" />
        <input type="text" placeholder="slug" name="slug" id="slug" />
        <input type="text" placeholder="userId" name="userId" id="userId" />
        <input type="text" placeholder="image URL" name="img" id="img" />
        <button onClick={getFormData}>Create Blog</button>
      </form>
    </div>
  );
};

export default FormPage;
