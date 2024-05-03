"use client";

import { useState } from "react";
// import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";


const IS_ADMIN = [
  { name: 'Yes', value: true },
  { name: 'No', value: false },
]

const AdminUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    isAdmin: null,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log('formData',formData)

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
        {IS_ADMIN.map((admin)=>(
           <option key={admin.name} value={admin.value}>{admin.name}</option>
        ))}
        {/* <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option> */}
      </select>
      <button>Create User</button>
      {/* {state?.error} */}
    </form>
  );
};

export default AdminUserForm;
