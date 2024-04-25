//filter paths and routes, restriction, approval
import {authConfig} from './lib/auth.config'
import NextAuth from "next-auth";

export default NextAuth(authConfig).auth

export const config ={
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
      ],
}