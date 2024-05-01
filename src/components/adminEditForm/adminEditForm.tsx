"use client";
import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import styles from "./adminEditForm.module.css"
import { updateBlog } from "@/lib/services";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0d0c22",
    width: "50%",
  },
};

const AdminEditForm = ({ post }: any) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    slug: "",
    userId: "",
    img: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function openModal(post: any) {
    setIsOpen(true);
    setPostId(post._id);

    setFormData({
      title: post.title,
      desc: post.desc,
      slug: post.slug,
      userId: post.userId,
      img: post.img,
    });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const submitFormData = async (event: any) => {
    event.preventDefault();

    await updateBlog(formData, postId);
    closeModal()
  };

  return (
    <>
      <button className={styles.editBtn} onClick={() => openModal(post)}>
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form action="" className={styles.form}>
          <label>Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            id="title"
            defaultValue={formData.title}
            onChange={handleChange}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="desc"
            name="desc"
            id="desc"
            defaultValue={formData.desc}
            onChange={handleChange}
          />
          <label>Path</label>
          <input
            type="text"
            placeholder="path"
            name="slug"
            id="slug"
            defaultValue={formData.slug}
            onChange={handleChange}
          />
          <label>User Id</label>
          <input
            type="text"
            placeholder="userId"
            name="userId"
            id="userId"
            defaultValue={formData.userId}
            onChange={handleChange}
          />
          <label>Image</label>
          <input
            type="text"
            placeholder="image URL"
            name="img"
            id="img"
            defaultValue={formData.img}
            onChange={handleChange}
          />
          <button onClick={submitFormData}>Edit Blog</button>
        </form>
      </Modal>
    </>
  );
};

export default AdminEditForm;
