import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { UserFilters } from "@/interfaces/user/types";

// GET /api/users
export async function GET(request: Request) {
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

    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") as "USER" | "ADMIN" | null;
    const isVerified =
      searchParams.get("isVerified") === "true"
        ? true
        : searchParams.get("isVerified") === "false"
        ? false
        : null;
    const city = searchParams.get("city") || "";
    const country = searchParams.get("country") || "";

    await connectDB();

    // Construire le filtre
    const filter: any = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role) filter.role = role.toLowerCase();
    if (isVerified !== null) filter.isVerified = isVerified;
    if (city) filter["address.city"] = { $regex: city, $options: "i" };
    if (country) filter["address.country"] = { $regex: country, $options: "i" };

    // Calculer la pagination
    const skip = (page - 1) * limit;
    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Récupérer les utilisateurs
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des utilisateurs",
      },
      { status: 500 }
    );
  }
}
