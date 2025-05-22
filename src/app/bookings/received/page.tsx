import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Tool from "@/models/Tool";
import Booking from "@/models/Booking";
import { BookingList } from "@/components/bookings/BookingList";
import { BookingStats } from "@/components/bookings/BookingStats";
import { BookingNotifications } from "@/components/bookings/BookingNotifications";

async function getReceivedBookings() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/bookings/received");
  }

  await connectDB();

  // Utiliser ownerId (string) pour la récupération des outils
  console.log("[DEBUG] ID utilisateur connecté:", session.user.id);
  const tools = await Tool.find({ ownerId: session.user.id }).select("_id");
  console.log("[DEBUG] Nombre d'outils trouvés:", tools.length);
  if (tools.length === 0) {
    console.log("[DEBUG] Aucun outil trouvé pour cet utilisateur.");
  }
  const toolIds = tools.map((t) => t._id);

  // 2. Trouver toutes les réservations sur ces outils
  const bookings = await Booking.find({ toolId: { $in: toolIds } })
    .sort({ createdAt: -1 })
    .populate({
      path: "toolId",
      select: "name images price deposit",
    })
    .populate({
      path: "userId",
      select: "name email",
    })
    .lean();
  console.log("[DEBUG] Nombre de réservations trouvées:", bookings.length);
  if (bookings.length === 0) {
    console.log("[DEBUG] Aucune réservation trouvée pour ces outils.");
  }

  // 3. Sérialiser les données pour le composant client
  const serializedBookings = bookings.map((booking: any) => ({
    id: booking._id.toString(),
    toolId: booking.toolId?._id?.toString() || "",
    userId: booking.userId?._id?.toString() || booking.userId?.toString() || "",
    renter:
      booking.userId && typeof booking.userId === "object"
        ? {
            name: booking.userId.name || "",
            email: booking.userId.email || "",
          }
        : null,
    startDate: booking.startDate?.toISOString() || "",
    endDate: booking.endDate?.toISOString() || "",
    totalPrice: booking.totalPrice,
    deposit: booking.deposit,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    createdAt: booking.createdAt?.toISOString() || "",
    updatedAt: booking.updatedAt?.toISOString() || "",
    tool: booking.toolId
      ? {
          name: booking.toolId.name,
          images: booking.toolId.images,
          price: booking.toolId.price,
          deposit: booking.toolId.deposit,
        }
      : {
          name: "Outil inconnu",
          images: [],
          price: 0,
          deposit: 0,
        },
  }));
  if (serializedBookings.length > 0) {
    console.log(
      "[DEBUG] Exemple de réservation sérialisée:",
      serializedBookings[0]
    );
  }

  return {
    serializedBookings,
    toolsLength: tools.length,
    bookingsLength: bookings.length,
  };
}

export default async function ReceivedBookingsPage() {
  const { serializedBookings, toolsLength, bookingsLength } =
    await getReceivedBookings();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Réservations reçues</h1>
      </div>

      {/* Affichage d'un message d'erreur explicite si aucune donnée trouvée */}
      {toolsLength === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-red-600">
            Aucun outil trouvé dont vous êtes propriétaire.
          </h2>
          <p className="mt-2 text-gray-500">
            Vérifiez que vous avez bien créé des outils avec votre compte.
          </p>
        </div>
      ) : bookingsLength === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-orange-600">
            Aucun utilisateur n'a encore réservé vos outils.
          </h2>
          <p className="mt-2 text-gray-500">
            Les réservations reçues apparaîtront ici dès qu'un utilisateur
            réservera un de vos outils.
          </p>
        </div>
      ) : (
        <>
          <BookingNotifications bookings={serializedBookings} />
          <BookingStats bookings={serializedBookings} />
          <BookingList bookings={serializedBookings} />
        </>
      )}
    </div>
  );
}
