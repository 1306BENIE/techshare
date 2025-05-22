import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Statut manquant" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Réservation non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier que l'utilisateur est autorisé à modifier cette réservation
    if (booking.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 403 }
      );
    }

    booking.status = status;
    await booking.save();

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
