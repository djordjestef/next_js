"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";

// export const addPost = async (formData) => {
//   console.log("formData", formData);
//   console.log(Object.fromEntries(formData));
//   const { title, desc, slug, userId } = Object.fromEntries(formData);
//   console.log("title", title);
//   try {
//     connectToDb();
//     const newPost = new Post({
//       title,
//       desc,
//       slug,
//       userId,
//     });

//     await newPost.save();
//     revalidatePath("/blog");
//     console.log("saved to DB");
//   } catch (error) {
//     console.log("error", error);
//     return { error: "Something went wrong" };
//   }
// };

// export const deletePost = async (formData) => {
//   const { id } = Object.fromEntries(formData);
//   console.log("id", id);
//   try {
//     await connectToDb();

//     await Post.findByIdAndDelete(id);
//     revalidatePath("/blog");
//     console.log("deleted from DB");
//   } catch (error) {
//     console.log("error", error);
//     return { error: "Something went wrong" };
//   }
// };

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) return "Password does not match";

  try {
    await connectToDb();

    const user = User.findOne({ username });

    if (user) return "User already exists";

    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
  } catch (error) {
    console.log("error", error);
  }
};
