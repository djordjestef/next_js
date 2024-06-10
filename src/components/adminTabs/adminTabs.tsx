"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostFrom";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserFrom";
import React, { useEffect, useState } from "react";
import styles from "./adminTabs.module.css";
import AdminSocket from "../adminSocket/adminSocket";

const AdminTabs = ({ session, posts, users }: any) => {
  const [loading, setLoading] = useState(false);

  return (
    <Tabs className={styles.tabs}>
      <TabList>
        <Tab>Blog List</Tab>
        <Tab>Add Blog</Tab>
        <Tab>User List</Tab>
        <Tab>Add User</Tab>
        <Tab>Socket Message</Tab>
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
      <TabPanel>
        <AdminSocket />
      </TabPanel>
    </Tabs>
  );
};

export default AdminTabs;
