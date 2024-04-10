import styles from "./postUser.module.css";

const getData = async (userId: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("User does not exist");
  }

  return res.json();
};

const PostUser = async ({ userId }) => {
  const user = await getData(userId);
  console.log("user", user);
  return (
    <div className={styles.container}>
      <div className={styles.title}>Author</div>
      <div className={styles.username}>{user.username}</div>
    </div>
  );
};

export default PostUser;
