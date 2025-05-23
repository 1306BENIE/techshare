import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    await connectDB();
    const { isApproved } = await request.json();
    const { commentId } = params;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { isApproved },
      { new: true }
    )
      .populate("author", "firstName lastName")
      .populate("post", "title");

    if (!comment) {
      return NextResponse.json(
        { message: "Commentaire non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
