"use client";

import { useState } from "react";
// import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { createUser } from "../../lib/services";
import { Alert } from "react-st-modal";

const IS_ADMIN = [
  { name: "Select option", value: null, selected: true, disabled: true },
  { name: "Yes", value: true, selected: false, disabled: false },
  { name: "No", value: false, selected: false, disabled: false },
];

const AdminUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    isAdmin: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.isAdmin === null
    )
      return Alert(`All inputs must be field`, "Error");

    await createUser(formData).then((res) => {
      if (res.error) {
        Alert(`${JSON.stringify(res.error).replaceAll('"', " ")}`, "Error");
      } else {
        Alert(`User has been created successfully`, "Success");
      }
    });
  };

  return (
    <form action="" className={styles.container}>
      <h1>Add New User</h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />
      <input type="text" name="img" placeholder="img" onChange={handleChange} />
      <select name="isAdmin" onChange={handleChange}>
        {IS_ADMIN.map((admin) => (
          <option
            key={admin.name}
            value={admin.value}
            selected={admin.selected}
            disabled={admin.disabled}
          >
            {admin.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Create User</button>
      {/* {state?.error} */}
    </form>
  );
};

export default AdminUserForm;
