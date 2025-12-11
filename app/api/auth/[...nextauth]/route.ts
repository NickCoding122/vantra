import NextAuth from "next-auth";
import authOptions from "../../../../lib/authOptions";

// NextAuth v5 App Router integration:
// This exports proper GET and POST handlers for the auth route.
export const {
  handlers: { GET, POST },
} = NextAuth(authOptions);
