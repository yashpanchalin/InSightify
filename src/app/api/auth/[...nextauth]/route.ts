import NextAuth from "next-auth/next";
import { authOpt } from "./options";

const handler = NextAuth(authOpt);

export {handler as GET, handler as POST}