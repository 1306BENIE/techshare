import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const { isActive } = await request.json();

    const user = await User.findByIdAndUpdate(
      params.userId,
      { isActive },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
