import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find()
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des posts" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json(
        { message: "ID du post manquant" },
        { status: 400 }
      );
    }

    await connectDB();
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return NextResponse.json({ message: "Post non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du post:", error);
    return NextResponse.json(
      { message: "Erreur lors de la suppression du post" },
      { status: 500 }
    );
  }
}
