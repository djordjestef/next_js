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

const socket = io('http://localhost:3000');
const AdminTabs = ({ session, posts, users }: any) => {
  const [loading, setLoading] = useState(false);



  const socketFn = async()=>{
    await fetch('/api/socket',{
      method: "POST",
      body: 'lalalallalalalala',
      // next:{
      //   tags:['admin']
      // })
    })
    // socket = io();

    socket.on("receive-message", (data) => {
     console.log('data',data)
    });
  }

 



    useEffect(() => {
        socket.on('message2', (data) => {
            console.log("Recieved from SERVER ::", data)
            // Execute any command
        })
    }, [socket]);
  // useEffect(() => {
  //   socketInitializer();

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // async function socketInitializer() {
  //   await fetch("/api/socket");

  //   socket = io();

  //   socket.on("receive-message", (data) => {
  //     // we get the data here
  //   });
  // }

  return (
    <Tabs className={styles.tabs}>
      <button onClick={socketFn}>click</button>
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
