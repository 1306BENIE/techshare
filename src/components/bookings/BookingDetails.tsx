"use client";
import React from "react";
import { BookingResponse } from "@/interfaces/booking";
import Link from "next/link";
import { BookingStatus } from "./BookingStatus";
import { PaymentStatus } from "./PaymentStatus";
import { useSession } from "next-auth/react";

interface BookingDetailsProps {
  booking: BookingResponse;
  onStatusUpdate?: (id: string, status: string) => Promise<void>;
  onPaymentStatusUpdate?: (id: string, status: string) => Promise<void>;
}

export function BookingDetails({
  booking,
  onStatusUpdate,
  onPaymentStatusUpdate,
}: BookingDetailsProps) {
  const { data: session } = useSession();
  const userId = session?.user?.email; // Utilisation de l'email comme identifiant temporaire

  const handleStatusUpdate = async (status: string) => {
    if (onStatusUpdate) {
      await onStatusUpdate(booking.id, status);
    }
  };

  const handlePaymentStatusUpdate = async (status: string) => {
    if (onPaymentStatusUpdate) {
      await onPaymentStatusUpdate(booking.id, status);
    }
  };

  const calculateDuration = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold">Détails de la réservation</h1>
            <div className="space-y-2">
              <BookingStatus
                status={booking.status}
                onUpdate={handleStatusUpdate}
                isOwner={userId === booking.userId}
              />
              <PaymentStatus
                status={booking.paymentStatus}
                onUpdate={handlePaymentStatusUpdate}
                isOwner={userId === booking.userId}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Informations de la réservation
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Dates</p>
                  <p className="font-medium">
                    Du {new Date(booking.startDate).toLocaleDateString()} au{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Durée : {calculateDuration()} jours
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Prix total payé</p>
                  <p className="font-medium">
                    {Number(booking.totalPrice || 0).toLocaleString("fr-FR")}{" "}
                    FCFA
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Caution versée</p>
                  <p className="font-medium">
                    {Number(booking.deposit || 0).toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Informations de l'outil
              </h2>
              <div className="space-y-4">
                <div className="flex space-x-6 items-center">
                  <div className="w-44 h-44 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-200 shadow-lg transition-transform duration-200 hover:scale-105">
                    {booking.tool?.images?.[0] ? (
                      <img
                        src={booking.tool.images[0]}
                        alt={booking.tool.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-gray-500">Image</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center h-full space-y-2">
                    <h3 className="font-medium text-lg text-gray-800">
                      {booking.tool?.name || "Outil inconnu"}
                    </h3>
                    <p className="text-gray-600">
                      Prix par jour :{" "}
                      {Number(booking.tool?.price || 0).toLocaleString("fr-FR")}{" "}
                      FCFA
                    </p>
                    <p className="text-gray-600">
                      Caution demandée :{" "}
                      {Number(booking.tool?.deposit || 0).toLocaleString(
                        "fr-FR"
                      )}{" "}
                      FCFA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold mb-4">
              Informations utilisateur
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Avatar</span>
              </div>
              <div>
                <p className="font-medium">
                  {booking.renter?.name || "Utilisateur"}
                </p>
                <p className="text-gray-600">{booking.renter?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href={`/tools/${booking.toolId}`}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Voir l'outil
            </Link>
            <Link
              href="/bookings"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retour aux réservations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
