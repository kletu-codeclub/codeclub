import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
 ...authConfig,
 adapter: PrismaAdapter(db),
 session: {
  strategy: "jwt",
 },
 pages: {
  signIn: "/auth",
 },
 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    // When user first signs in, get their data from the database
    // try {
    //   const dbUser = await db.user.findUnique({
    //     where: { email: user.email! },
    //     select: { id: true, cfHandle: true, email: true, name: true }
    //   });
      
    //   if (dbUser) {
    //     token.id = dbUser.id;
    //     token.cfHandle = dbUser.cfHandle;
    //   } else {
    //     // User doesn't exist in our database yet
    //     token.id = user.id;
    //     token.cfHandle = null;
    //   }
    // } catch (error) {
    //   console.error("Error fetching user from database:", error);
    //   token.id = user.id;
    //   token.cfHandle = null;
    // }
    token.id = user.id;
    token.cfHandle = user.cfHandle || null;
   }

   return token;
  },

  async session({ session, token }) {
   if (token) {
    // set the token data to session
    session.user.id = String(token.id);
    session.user.cfHandle = (token.cfHandle as string) || null;
   }

   if (token.sub) {
      try {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub },
          select: { id: true, cfHandle: true, email: true, name: true }
        });
        
        if (dbUser) {
          token.id = dbUser.id;
          token.cfHandle = dbUser.cfHandle;
        }
      } catch (error) {
        console.error("Error fetching user from database:", error);
      }
    }

   return session;
  },

  redirect({ url, baseUrl }) {
   // Check if there's a callbackUrl in the URL parameters
   const callbackUrl = new URL(url).searchParams.get("callbackUrl");
   if (callbackUrl) {
    return callbackUrl;
   }
   return "/explore";
  },
 },
});