import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./mongodb";
import User, { IUser, IUserModel, IUserMethods } from "@/models/User";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        await connectDB();

        const user = (await User.findOne({ email: credentials.email }).select(
          "+password"
        )) as IUser & IUserMethods & { _id: Types.ObjectId };
        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        const isPasswordValid = await user.comparePassword(
          credentials.password
        );
        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
};
