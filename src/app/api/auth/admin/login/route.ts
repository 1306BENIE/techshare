import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// TODO: Déplacer ces informations dans un fichier de configuration sécurisé
const ADMIN_EMAIL = "admin@techshare.com";
const ADMIN_PASSWORD = "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";

export async function POST(request: Request) {
  try {
    console.log("Début de la tentative de connexion admin");
    const body = await request.json();
    const { email, password } = body;
    console.log("Email reçu:", email);

    console.log("Tentative de connexion à la base de données...");
    await connectDB();
    console.log("Connexion à la base de données réussie");

    // Rechercher l'utilisateur dans la base de données avec le mot de passe
    console.log("Recherche de l'utilisateur admin...");
    const user = await User.findOne({ email, role: "admin" }).select(
      "+password"
    );
    console.log(
      "Résultat de la recherche:",
      user ? "Utilisateur trouvé" : "Utilisateur non trouvé"
    );

    if (!user) {
      console.log("Email incorrect ou compte administrateur inexistant");
      return NextResponse.json(
        { message: "Email incorrect ou compte administrateur inexistant" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    console.log("Vérification du mot de passe...");
    if (!user.password) {
      console.log("Mot de passe non trouvé dans la base de données");
      return NextResponse.json(
        { message: "Erreur de configuration du compte administrateur" },
        { status: 500 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(
      "Résultat de la vérification du mot de passe:",
      isPasswordValid ? "Correct" : "Incorrect"
    );

    if (!isPasswordValid) {
      console.log("Mot de passe incorrect");
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Création du token JWT
    console.log("Création du token JWT...");
    const token = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Configuration du cookie
    console.log("Configuration du cookie...");
    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 jour
    });

    // Retourner l'utilisateur sans le mot de passe
    const userWithoutPassword = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    console.log("Connexion réussie pour:", user.email);
    return NextResponse.json(
      {
        success: true,
        message: "Connexion réussie",
        data: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur détaillée lors de la connexion admin:", error);
    return NextResponse.json(
      { message: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
