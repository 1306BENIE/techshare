import React from "react";
import { BookingDetails } from "@/components/bookings/BookingDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import axios from "axios";

async function getBooking(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/bookings");
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

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await getBooking(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <BookingDetails booking={booking} />
    </div>
  );
}
