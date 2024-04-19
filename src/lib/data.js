"use server";//this is a problem try to make request from client side
import { User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

//FETCH DATA WITHOUT APIs

// export const getPosts = async () => {
//   try {
//     connectToDb();
//     const posts = await Post.find();
//     return posts;
//   } catch (error) {
//     console.log("error", error);
//     throw new Error(error);
//   }
// };

// export const getPost = async (slug) => {
//   try {
//     connectToDb();
//     const post = await Post.findOne({ slug });
//     return post;
//   } catch (error) {
//     console.log("error", error);
//     throw new Error(error);
//   }
// };

export const getUser = async (id) => {
  console.log("GET USER");
  noStore();
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch user!");
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

export async function postBlog(formData) {
  const url = "http://localhost:3000/api/blog";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ formData: formData }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to generate blog:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
}
