"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import styles from "./editForm.module.css";

const EditForm = () => {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <Button className={styles.editBtn} onClick={() => setOpenModal(true)}>
        Edit
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className='modalContainer'
      >
        <Modal.Header />
        <Modal.Body>
          {/* <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div> */}
          <h1>Edit Blog</h1>
          <form action="" className={styles.form}>
            <input type="text" placeholder="title" name="title" id="title" />
            <input type="text" placeholder="desc" name="desc" id="desc" />
            <input type="text" placeholder="slug" name="slug" id="slug" />
            <input type="text" placeholder="userId" name="userId" id="userId" />
            <input type="text" placeholder="image URL" name="img" id="img" />
            {/* <button onClick={getFormData}>Create Blog</button> */}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditForm;
