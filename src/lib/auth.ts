import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const nextAuthSecret = process.env.NEXTAUTH_SECRET || "rumiatlas-secret-key-fallback-build";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@rumiatlas.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password.");
        }

        const emailLower = credentials.email.toLowerCase().trim();

        if (!isDatabaseConfigured()) {
          if (emailLower === "admin@rumiatlas.com" && credentials.password === "rumiatlas2026") {
            return {
              id: "admin-demo-id",
              name: "Editorial Curator",
              email: "admin@rumiatlas.com",
              role: "ADMIN",
              image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            };
          }
          throw new Error("Invalid credentials.");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: emailLower },
          });

          if (user && user.passwordHash) {
            const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (isValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.avatar,
              };
            }
          }
        } catch (e) {
          console.error("Auth DB query error:", e);
        }

        // Fallback for default admin credentials when DB is unseeded or query fails
        if (emailLower === "admin@rumiatlas.com" && credentials.password === "rumiatlas2026") {
          return {
            id: "admin-default-id",
            name: "Editorial Curator",
            email: "admin@rumiatlas.com",
            role: "ADMIN",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
          };
        }

        throw new Error("Invalid credentials.");
      },

    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: nextAuthSecret,
};
