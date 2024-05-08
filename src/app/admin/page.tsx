import { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostFrom";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserFrom";
import { auth } from "@/lib/auth";
import { getBlogs, getUsers } from "@/lib/services";

const AdminPage = async () => {
  const session: any = await auth();
  const posts = await getBlogs();
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts posts={posts} />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm userId={session?.user?.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers userId={session?.user?.id} users={users} />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
