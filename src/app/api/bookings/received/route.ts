import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Tool from "@/models/Tool";

export const dynamic = "force-dynamic";

// GET /api/bookings/received
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }
    await connectDB();

    // Pagination
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Trouver les outils dont l'utilisateur est propriétaire
    const tools = await Tool.find({ ownerId: session.user.id }, { _id: 1 });
    const toolIds = tools.map((t) => t._id);

    // Trouver les réservations pour ces outils
    const [bookings, total] = await Promise.all([
      Booking.find({ toolId: { $in: toolIds } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("toolId")
        .populate("userId"),
      Booking.countDocuments({ toolId: { $in: toolIds } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: bookings,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des réservations reçues:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des réservations reçues",
      },
      { status: 500 }
    );
  }
}
