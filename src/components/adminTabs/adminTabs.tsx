"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostFrom";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserFrom";
import React, { useEffect, useState } from "react";
import styles from "./adminTabs.module.css";
import io from "socket.io-client";

let socket;

const AdminTabs = ({ session, posts, users }: any) => {
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     // Create a socket connection
  //     const socket = io();
  //     console.log('socket',socket)

  //     // Listen for incoming messages
  //     socket.on('message', (message) => {
  //         // setMessages((prevMessages) => [...prevMessages, message]);
  //     });

  //     // Clean up the socket connection on unmount
  //     return () => {
  //         socket.disconnect();
  //     };
  // }, []);

  // const socketInitializer = async () => {
  //   await fetch("/api/socket");
  //   socket = io();

  //   socket.on("connect", () => {
  //     console.log("connected");
  //   });
  // };

  // const click = () => {
  //   socketInitializer();
  // };

  return (
    <Tabs className={styles.tabs}>
      <TabList>
        <Tab>Blog List</Tab>
        <Tab>Add Blog</Tab>
        <Tab>User List</Tab>
        <Tab>Add User</Tab>
      </TabList>

      <TabPanel>
        <AdminPosts posts={posts} loading={loading} setLoading={setLoading} />
      </TabPanel>
      <TabPanel>
        <AdminPostForm userId={session?.user?.id} />
      </TabPanel>
      <TabPanel>
        <AdminUsers
          userId={session?.user?.id}
          users={users}
          loading={loading}
          setLoading={setLoading}
        />
      </TabPanel>
      <TabPanel>
        <AdminUserForm />
      </TabPanel>
    </Tabs>
  );
};

export default AdminTabs;
