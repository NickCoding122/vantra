import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAILS = ["nick@vantra.app", "anton@vantra.app"];

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      // Only allow listed admin emails to sign in
      return ADMIN_EMAILS.includes(user.email);
    },
    async session({ session }) {
      if (session?.user?.email && ADMIN_EMAILS.includes(session.user.email)) {
        // Add a simple flag onto the session
        (session.user as any).isAdmin = true;
      }
      return session;
    },
  },
};

export default authOptions;
