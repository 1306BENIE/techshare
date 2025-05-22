import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();
    const { isPublished } = await request.json();

    const post = await Post.findByIdAndUpdate(
      params.postId,
      { isPublished },
      { new: true }
    ).populate("author", "firstName lastName");

    if (!post) {
      return NextResponse.json({ message: "Post non trouvé" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
