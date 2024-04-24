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
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

const EditForm = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
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
      <button className={styles.editBtn} onClick={openModal}>
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form action="" className={styles.form}>
          <input type="text" placeholder="title" name="title" id="title" />
          <input type="text" placeholder="desc" name="desc" id="desc" />
          <input type="text" placeholder="slug" name="slug" id="slug" />
          <input type="text" placeholder="userId" name="userId" id="userId" />
          <input type="text" placeholder="image URL" name="img" id="img" />
          {/* <button onClick={getFormData}>Create Blog</button> */}
        </form>
      </Modal>
    </>
  );
};

export default EditForm;
