"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostFrom";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserFrom";
import React, { useState, useContext, useEffect } from "react";
import styles from "./adminTabs.module.css";
import { MyContext, ActionType } from "@/app/Store";
import { getUsers } from "@/lib/services";

const AdminTabs = ({ session, posts }: any) => {
  const { state, dispatch } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('USE EFFECT')
    if (state.users.data.length === 0) {
      getUsers()
        .then((res) => {
          dispatch({ type: ActionType.FETCH_USERS_SUCCESS, payload: res.data });
        })
        .catch((error) => dispatch({ type: ActionType.FETCH_USERS_ERROR }));
    }
  }, [dispatch]);

  console.log("state", state);

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
        <AdminUsers userId={session?.user?.id} users={state.users} />
      </TabPanel>
      <TabPanel>
        <AdminUserForm />
      </TabPanel>
    </Tabs>
  );
};

export default AdminTabs;
