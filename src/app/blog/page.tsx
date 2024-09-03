import PostCard from "@/components/postCard/CardPost";
import styles from "./blog.module.css";
import { getBlogs } from "@/lib/services";
import { auth } from "@/lib/auth";

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const session = await auth();
  const posts = await getBlogs();

  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.data.map((post: any) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} session={session} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
