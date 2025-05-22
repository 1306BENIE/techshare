import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateToolSchema } from "@/lib/validations/tool";
import connectDB from "@/lib/mongodb";
import Tool from "@/models/Tool";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/tools/[id] - Récupération d'un outil
export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const tool = await Tool.findById(params.id)
      .populate("ownerId", "name email")
      .lean();

    if (!tool) {
      return NextResponse.json({ error: "Outil non trouvé" }, { status: 404 });
    }

    // Incrémenter le compteur de vues
    await Tool.findByIdAndUpdate(params.id, {
      $inc: { "metadata.views": 1 },
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error(`Error in GET /api/tools/${params.id}:`, error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'outil" },
      { status: 500 }
    );
  }
}

// PUT /api/tools/[id] - Mise à jour d'un outil
export async function PUT(request: Request, { params }: RouteParams) {
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

    const body = await request.json();
    const validatedData = updateToolSchema.parse(body);

    const updatedTool = await Tool.findByIdAndUpdate(
      params.id,
      { $set: validatedData },
      { new: true }
    ).populate("ownerId", "name email");

    return NextResponse.json(updatedTool);
  } catch (error) {
    console.error(`Error in PUT /api/tools/${params.id}:`, error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'outil" },
      { status: 500 }
    );
  }
}

// DELETE /api/tools/[id] - Suppression d'un outil
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
        { error: "Non autorisé à supprimer cet outil" },
        { status: 403 }
      );
    }

    // Soft delete
    await Tool.findByIdAndUpdate(params.id, {
      $set: { status: "DELETED" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in DELETE /api/tools/${params.id}:`, error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'outil" },
      { status: 500 }
    );
  }
}

// PATCH /api/tools/[id]/status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    // TODO: Implémenter la logique de mise à jour du statut d'un outil
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la mise à jour du statut de l'outil",
      },
      { status: 500 }
    );
  }
}
