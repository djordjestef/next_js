"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostFrom";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserFrom";
import React, { useState } from "react";
import styles from "./adminTabs.module.css";

const AdminTabs = ({ session, posts, users }: any) => {
  const [loading, setLoading] = useState(false);

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
        <AdminUsers userId={session?.user?.id} users={users} />
      </TabPanel>
      <TabPanel>
        <AdminUserForm />
      </TabPanel>
    </Tabs>
  );
};

export default AdminTabs;
