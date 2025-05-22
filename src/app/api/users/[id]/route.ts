import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Types } from "mongoose";

// GET /api/users/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;

    // Vérifier si l'utilisateur est admin ou s'il accède à son propre profil
    if (session.user.role !== "admin" && session.user.id !== id) {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
    }

    await connectDB();

    // Vérifier si l'ID est valide
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération de l'utilisateur",
      },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id]
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

    const { id } = params;

    // Vérifier si l'utilisateur est admin ou s'il modifie son propre profil
    if (session.user.role !== "admin" && session.user.id !== id) {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
    }

    const data = await request.json();

    // Si l'utilisateur n'est pas admin, empêcher la modification du rôle
    if (session.user.role !== "admin" && data.role) {
      delete data.role;
    }

    await connectDB();

    // Vérifier si l'ID est valide
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

    // Mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
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
    });
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Erreur lors de la mise à jour de l'utilisateur",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(
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

    // Empêcher l'auto-suppression
    if (session.user.id === id) {
      return NextResponse.json(
        { message: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
    }

    await connectDB();

    // Vérifier si l'ID est valide
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID d'utilisateur invalide" },
        { status: 400 }
      );
    }

    // Supprimer l'utilisateur
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la suppression de l'utilisateur",
      },
      { status: 500 }
    );
  }
}
