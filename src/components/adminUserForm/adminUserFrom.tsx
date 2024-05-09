"use client";

import { useState } from "react";
import styles from "./adminUserForm.module.css";
import { createUser } from "../../lib/services";
import { Alert } from "react-st-modal";
import { useRouter } from "next/navigation";

const IS_ADMIN = [
  { name: "Is Admin", value: "", selected: true, disabled: true },
  { name: "Yes", value: true, selected: false, disabled: false },
  { name: "No", value: false, selected: false, disabled: false },
];

const AdminUserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    isAdmin: "",
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
        setFormData({
          username: "",
          email: "",
          password: "",
          img: "",
          isAdmin: "",
        });
        router.refresh();
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
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="img"
        placeholder="img"
        value={formData.img}
        onChange={handleChange}
      />
      <select name="isAdmin" value={formData.isAdmin} onChange={handleChange}>
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
