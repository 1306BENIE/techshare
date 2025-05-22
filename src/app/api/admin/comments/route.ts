import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET() {
  try {
    await connectDB();

    const comments = await Comment.find()
      .populate("author", "firstName lastName")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des commentaires" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");

    if (!commentId) {
      return NextResponse.json(
        { message: "ID du commentaire manquant" },
        { status: 400 }
      );
    }

    await connectDB();
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return NextResponse.json(
        { message: "Commentaire non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    return NextResponse.json(
      { message: "Erreur lors de la suppression du commentaire" },
      { status: 500 }
    );
  }
}
