import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const adminEmails = [
  "nick@vantra.app",
  "anton@vantra.app"
].map(e => e.toLowerCase());

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user?.email?.toLowerCase() ?? "";
      return adminEmails.includes(email);
    },
    async session({ session }) {
      const email = session.user?.email?.toLowerCase() ?? "";
      (session as any).isAdmin = adminEmails.includes(email);
      return session;
    }
  },
  pages: {
    signIn: "/api/auth/signin"
  }
};
