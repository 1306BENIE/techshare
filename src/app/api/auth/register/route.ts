import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_ERRORS } from "@/constants/auth/errors";
import { signUpSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Données d'inscription reçues:", {
      ...body,
      password: "[REDACTED]",
    });

    // Validation des données avec Zod
    try {
      signUpSchema.parse(body);
    } catch (error: any) {
      console.error("Erreur de validation:", error.errors);
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phoneNumber, address, password } = body;

    // Connexion à la base de données
    await connectDB();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email déjà utilisé:", email);
      return NextResponse.json(
        { message: AUTH_ERRORS.EMAIL_IN_USE },
        { status: 400 }
      );
    }

    // Créer le nouvel utilisateur (le hachage sera fait par le middleware)
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password, // Le mot de passe sera hashé automatiquement
    });

    console.log("Utilisateur créé avec succès:", {
      email: user.email,
      id: user._id,
    });

    // Retourner l'utilisateur créé (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      { message: "Compte créé avec succès", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error);

    // Gérer les erreurs spécifiques
    if (error.code === 11000) {
      return NextResponse.json(
        { message: AUTH_ERRORS.EMAIL_IN_USE },
        { status: 400 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { message: messages[0] || AUTH_ERRORS.SERVER_ERROR },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: AUTH_ERRORS.SERVER_ERROR },
      { status: 500 }
    );
  }
}
