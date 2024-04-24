"use client";
import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import styles from "./editForm.module.css";

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

const EditForm = ({ post }: any) => {
  const [modalIsOpen, setIsOpen] = useState(false);
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

  const getFormData = (event: any) => {
    event.preventDefault();
    console.log("get", formData);
  };
  // console.log('post FORM',post)
  function openModal(post: any) {
    console.log("post", post);
    setIsOpen(true);

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
          <button onClick={getFormData}>Create Blog</button>
        </form>
      </Modal>
    </>
  );
};

export default EditForm;
