import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { IUser, IUserMethods } from "@/interfaces/user/types";
import { AUTH_ERRORS } from "@/constants/auth/errors";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Types } from "mongoose";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Email ou mot de passe manquant");
          throw new Error(AUTH_ERRORS.REQUIRED_FIELDS);
        }

        try {
          await connectDB();
          console.log("Tentative de connexion pour:", credentials.email);

          const user = (await User.findOne({ email: credentials.email }).select(
            "+password"
          )) as IUser & IUserMethods & { _id: Types.ObjectId };

          if (!user) {
            console.log("Utilisateur non trouvé:", credentials.email);
            throw new Error(AUTH_ERRORS.INVALID_EMAIL);
          }

          console.log("Utilisateur trouvé, vérification du mot de passe");

          const isPasswordValid = await user.comparePassword(
            credentials.password
          );

          console.log(
            "Résultat de la vérification du mot de passe:",
            isPasswordValid
          );

          if (!isPasswordValid) {
            console.log(
              "Mot de passe invalide pour l'utilisateur:",
              user.email
            );
            throw new Error(AUTH_ERRORS.INVALID_PASSWORD);
          }

          console.log("Connexion réussie pour:", user.email);

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Erreur détaillée d'authentification:", {
            message: error.message,
            stack: error.stack,
          });
          throw new Error(error.message || AUTH_ERRORS.SERVER_ERROR);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  debug: true, // Activer le mode debug
});

export { handler as GET, handler as POST };
