import React from "react";
import { BookingDetails } from "@/components/bookings/BookingDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import axios from "axios";

async function getReceivedBooking(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/bookings/received");
  }

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw new Error("Erreur lors de la récupération de la réservation");
  }
}

export default async function ReceivedBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await getReceivedBooking(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <BookingDetails
        booking={booking}
        onStatusUpdate={async (id, status) => {
          "use server";
          try {
            await axios.patch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/status`,
              { status }
            );
          } catch (error) {
            console.error("Erreur:", error);
            throw new Error("Erreur lors de la mise à jour du statut");
          }
        }}
        onPaymentStatusUpdate={async (id, status) => {
          "use server";
          try {
            await axios.patch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/payment`,
              { status }
            );
          } catch (error) {
            console.error("Erreur:", error);
            throw new Error(
              "Erreur lors de la mise à jour du statut de paiement"
            );
          }
        }}
      />
    </div>
  );
}
