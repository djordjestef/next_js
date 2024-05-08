//filter paths and routes, restriction, approval
import { authConfig } from "./lib/auth.config";
import NextAuth from "next-auth";

export default NextAuth(authConfig).auth; //fn that call authConfig callback autorized fn, when it return false,mathcer blocks()allows defined request
// If the authorized callback returns false, the request is blocked, and the middleware returns a response based on your matcher configuration in middleware.js.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|register).*)",
  ],
};
