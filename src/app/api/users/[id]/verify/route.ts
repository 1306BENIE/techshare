import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Types } from "mongoose";

// PUT /api/users/[id]/verify
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    // Vérifier si l'utilisateur est admin
    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
    }

    const { id } = params;

    await connectDB();

    // Vérifier si l'ID est valide
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

    // Mettre à jour le statut de vérification
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { isVerified: true } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: "Utilisateur vérifié avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la vérification de l'utilisateur",
      },
      { status: 500 }
    );
  }
}
