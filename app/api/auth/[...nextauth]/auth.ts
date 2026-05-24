import NextAuth from "next-auth";
import { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock auth - replace with real API call
        if (credentials?.email === "admin@aisprintos.dev" && credentials?.password === "password") {
          return {
            id: "1",
            email: "admin@aisprintos.dev",
            name: "Admin User",
            role: "ADMIN",
            image: "https://avatars.githubusercontent.com/u/1",
          };
        }
        if (credentials?.email === "dev@aisprintos.dev" && credentials?.password === "password") {
          return {
            id: "2",
            email: "dev@aisprintos.dev",
            name: "Developer",
            role: "DEVELOPER",
            image: "https://avatars.githubusercontent.com/u/2",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
