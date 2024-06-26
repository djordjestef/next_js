import { Suspense } from "react";
import styles from "./admin.module.css";
import { auth } from "@/lib/auth";
import { getBlogs, getUsers } from "@/lib/services";
import AdminTabs from "../../components/adminTabs/TabsAdmin";

const AdminPage = async () => {
  const session: any = await auth();
  const posts = await getBlogs();
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <AdminTabs session={session} posts={posts} users={users} />
    </div>
  );
};

export default AdminPage;
