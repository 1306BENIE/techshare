import React from "react";
import { BookingList } from "@/components/bookings/BookingList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

async function getBookings() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/bookings");
  }

  await connectDB();

  const bookings = await Booking.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .populate({
      path: "toolId",
      select: "name images price deposit",
    })
    .lean();

  // Sérialiser les données pour éviter les références circulaires
  const serializedBookings = bookings.map((booking) => ({
    id: booking._id.toString(),
    toolId: booking.toolId._id.toString(),
    userId: booking.userId.toString(),
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    totalPrice: booking.totalPrice,
    deposit: booking.deposit,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    tool: {
      name: booking.toolId.name,
      images: booking.toolId.images,
      price: booking.toolId.price,
      deposit: booking.toolId.deposit,
    },
  }));

  return {
    items: serializedBookings,
    total: serializedBookings.length,
    page: 1,
    limit: 10,
    totalPages: 1,
  };
}

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes réservations</h1>
      </div>

      {bookings.items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600">
            Vous n'avez pas encore de réservations
          </h2>
          <p className="mt-2 text-gray-500">
            Commencez à louer des outils en parcourant notre catalogue
          </p>
          <div className="mt-4">
            <a
              href="/tools"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Voir les outils disponibles
            </a>
          </div>
        </div>
      ) : (
        <BookingList bookings={bookings.items} />
      )}
    </div>
  );
}
