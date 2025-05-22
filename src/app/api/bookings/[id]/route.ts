import { NextRequest, NextResponse } from "next/server";
import { BookingController } from "@/controllers/booking.controller";
import Booking from "@/models/Booking";

const bookingController = new BookingController();

// GET /api/bookings/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const booking = await Booking.findById(id)
      .populate({ path: "toolId", select: "name images price deposit" })
      .populate({ path: "userId", select: "name email" })
      .lean();

    console.log("[DEBUG] booking trouvé:", booking);

    if (!booking || Array.isArray(booking)) {
      return NextResponse.json(
        { success: false, error: "Réservation non trouvée" },
        { status: 404 }
      );
    }
    const b = booking as Record<string, any>;
    // Sérialisation
    const serializedBooking = {
      id: b._id.toString(),
      toolId: b.toolId?._id?.toString() || "",
      userId: b.userId?._id?.toString() || b.userId?.toString() || "",
      renter: b.userId
        ? {
            email: b.userId.email || "",
            name: b.userId.name || "",
          }
        : null,
      startDate: b.startDate?.toISOString() || "",
      endDate: b.endDate?.toISOString() || "",
      totalPrice: b.totalPrice,
      deposit: b.deposit,
      status: b.status,
      paymentStatus: b.paymentStatus,
      createdAt: b.createdAt?.toISOString() || "",
      updatedAt: b.updatedAt?.toISOString() || "",
      tool: b.toolId
        ? {
            name: b.toolId.name,
            images: b.toolId.images,
            price: b.toolId.price,
            deposit: b.toolId.deposit,
          }
        : {
            name: "Outil inconnu",
            images: [],
            price: 0,
            deposit: 0,
          },
    };
    return NextResponse.json({ success: true, data: serializedBooking });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération de la réservation",
      },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    // TODO: Implémenter la logique de mise à jour d'une réservation
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la mise à jour de la réservation",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // TODO: Implémenter la logique de suppression d'une réservation
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la suppression de la réservation",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/[id]/status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    // TODO: Implémenter la logique de mise à jour du statut d'une réservation
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la mise à jour du statut de la réservation",
      },
      { status: 500 }
    );
  }
}
