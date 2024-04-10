import { Post } from "./models";
import { connectToDb } from "./utils";

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.find({ slug });
    return post;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

export const getUser = async (id) => {
  try {
    connectToDb();
    const user = await User.find({ id });
    return user;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};
