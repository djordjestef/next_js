export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.username = token.username;
      }

      return session;
    },

    authorized({ auth, request }) {
      // console.log("auth AUTH.CONFIG", auth);
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnChatPage = request.nextUrl.pathname.startsWith("/chat");

      //ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }
      //BLOCK ALL PATHS IF USER IS NOT AUTHENTICATED
      // if(!user) return false

      //ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !user) {
        return false;
      }
      //ONLY AUTHENTICATED USERS CAN REACH THE CHAT PAGE
      if (isOnChatPage && !user) return false;

      //ONLY AUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        //redirect
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
};
