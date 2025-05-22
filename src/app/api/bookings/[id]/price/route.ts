import { NextRequest, NextResponse } from "next/server";
import { BookingController } from "@/controllers/booking.controller";

const bookingController = new BookingController();

// POST /api/bookings/[id]/price
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await bookingController.calculateBookingPrice(
    params.id,
    request
  );
  if (!response.success) {
    return NextResponse.json(response, { status: 400 });
  }
  return NextResponse.json(response);
}
