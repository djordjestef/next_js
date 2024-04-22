"use server";
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

// export const getUser = async (id) => {
//   console.log("GET USER");
//   noStore();
//   try {
//     await connectToDb();
//     const user = await User.findById(id);
//     return user;
//   } catch (error) {
//     console.log("error", error);
//     throw new Error("Failed to fetch user!");
//   }
// };

// export const getUsers = async () => {
//   try {
//     await connectToDb();
//     const users = await User.find();
//     return users;
//   } catch (error) {
//     console.log("error", error);
//     throw new Error(error);
//   }
// };
