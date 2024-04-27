export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      console.log("auth", auth);
      if (auth) return true;
      return false;
    },
  },
};
