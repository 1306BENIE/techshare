import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des utilisateurs" },
      { status: 500 }
    );
  }
}
