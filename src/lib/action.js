"use server";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Password does not match" };
  }

  try {
    await connectToDb();

    const user = await User.findOne({ username });

    if (user) return { error: "User already exists" };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      img,
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { error: "Something went wrong" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
    return { success: true };
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};

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
//     revalidatePath("/admin");
//     console.log("deleted from DB");
//   } catch (error) {
//     console.log("error", error);
//     return { error: "Something went wrong" };
//   }
// };
