import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username });

    console.log('user',user)
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong credential");
    }

    return user;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          console.log("credentials", credentials);
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    //login WITH GITHUB ACC
    async signIn({ user, account, profile }) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      if (account.provider === "github") {
        await connectToDb();

        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            console.log("creating NEW USER");
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log("error", error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
