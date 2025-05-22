import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

export async function GET() {
  try {
    await connectDB();

    // Récupérer les statistiques
    const [totalUsers, totalPosts, totalComments, recentUsers] =
      await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),
        User.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select("firstName lastName email createdAt"),
      ]);

    return NextResponse.json({
      totalUsers,
      totalPosts,
      totalComments,
      recentUsers,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
