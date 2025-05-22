import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Tool from "@/models/Tool";

interface RouteParams {
  params: {
    id: string;
  };
}

// DELETE /api/tools/[id]/images - Suppression d'une image d'un outil
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await connectDB();

    const tool = await Tool.findById(params.id);
    if (!tool) {
      return NextResponse.json({ error: "Outil non trouvé" }, { status: 404 });
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (tool.ownerId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Non autorisé à modifier cet outil" },
        { status: 403 }
      );
    }

    const { imageUrl } = await request.json();
    if (!imageUrl) {
      return NextResponse.json(
        { error: "URL de l'image requise" },
        { status: 400 }
      );
    }

    // Supprimer l'image du tableau d'images
    const updatedTool = await Tool.findByIdAndUpdate(
      params.id,
      { $pull: { images: imageUrl } },
      { new: true }
    );

    return NextResponse.json(updatedTool);
  } catch (error) {
    console.error(`Error in DELETE /api/tools/${params.id}/images:`, error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'image" },
      { status: 500 }
    );
  }
}
