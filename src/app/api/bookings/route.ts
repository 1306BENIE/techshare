import { NextRequest, NextResponse } from "next/server";
import { BookingController } from "@/controllers/booking.controller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Tool from "@/models/Tool";

const bookingController = new BookingController();

// GET /api/bookings
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }
    // On ajoute l'id de l'utilisateur connecté dans les filtres
    const url = new URL(req.url);
    url.searchParams.set("userId", session.user.id);
    // On crée une nouvelle requête avec les bons searchParams
    const newReq = new NextRequest(url, req);
    const result = await bookingController.getBookings(newReq);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des réservations",
      },
      { status: 500 }
    );
  }
}

// POST /api/bookings
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { toolId, startDate, endDate } = data;

    if (!toolId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Données manquantes" },
        { status: 400 }
      );
    }

    await connectDB();

    // Vérifier si l'outil existe
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return NextResponse.json(
        { success: false, error: "Outil non trouvé" },
        { status: 404 }
      );
    }

    // Calculer la durée en jours
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calculer le prix total et la caution
    const totalPrice = tool.pricePerDay * duration;
    const deposit = tool.deposit;

    // Créer la réservation
    const booking = await Booking.create({
      toolId,
      userId: session.user.id,
      startDate: start,
      endDate: end,
      totalPrice,
      deposit,
      status: "PENDING",
      paymentStatus: "PENDING",
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création de la réservation" },
      { status: 500 }
    );
  }
}
