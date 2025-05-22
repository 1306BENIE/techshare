import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { AUTH_ERRORS } from "@/constants/auth/errors";
import bcrypt from "bcryptjs";

// POST /api/auth/admin/register
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, password, secretKey } = data;

    // Vérifier la clé secrète
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { message: AUTH_ERRORS.INVALID_SECRET_KEY },
        { status: 401 }
      );
    }

    await connectDB();

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: AUTH_ERRORS.EMAIL_ALREADY_EXISTS },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur admin
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true, // Les admins sont automatiquement vérifiés
      address: {
        street: "Admin Street",
        city: "Admin City",
        postalCode: "00000",
        country: "Admin Country",
      },
    });

    // Retourner l'utilisateur sans le mot de passe
    const userWithoutPassword = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    return NextResponse.json({
      success: true,
      message: "Administrateur créé avec succès",
      data: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'administrateur:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Erreur lors de la création de l'administrateur",
      },
      { status: 500 }
    );
  }
}
