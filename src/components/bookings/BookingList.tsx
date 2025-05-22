"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BookingStatus } from "./BookingStatus";
import { PaymentStatus } from "./PaymentStatus";
import toast from "react-hot-toast";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface Tool {
  name: string;
  images: string[];
  price: number;
  deposit: number;
}

interface Booking {
  id: string;
  toolId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  deposit: number;
  status: string;
  paymentStatus: string;
  tool: Tool;
}

interface BookingListProps {
  bookings: Booking[];
}

export function BookingList({ bookings: initialBookings }: BookingListProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.name || "Utilisateur";
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour du statut");
      toast.success("Statut mis à jour avec succès");
    } catch (error) {
      setBookings(initialBookings);
      toast.error("Erreur lors de la mise à jour du statut");
      console.error("Erreur:", error);
    }
  };

  const handlePaymentStatusUpdate = async (id: string, status: string) => {
    try {
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, paymentStatus: status } : booking
        )
      );
      const response = await fetch(`/api/bookings/${id}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour du statut de paiement");
      toast.success("Statut de paiement mis à jour avec succès");
    } catch (error) {
      setBookings(initialBookings);
      toast.error("Erreur lors de la mise à jour du statut de paiement");
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      {/* Header visuel personnalisé */}
      <div className="relative mb-10">
        <div className="h-36 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-2xl shadow-lg flex items-center px-8">
          <UserCircleIcon className="w-16 h-16 text-white drop-shadow-lg mr-6" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Bienvenue, {userName} !
            </h2>
            <p className="text-white/90 text-lg flex items-center gap-2">
              <CalendarDaysIcon className="w-6 h-6 text-white/80" />
              Voici le récapitulatif de vos réservations
            </p>
          </div>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-0 flex flex-col overflow-hidden border border-gray-100 group cursor-pointer hover:scale-[1.03]"
          >
            {/* Image outil */}
            <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center overflow-hidden">
              {booking.tool && booking.tool.images && booking.tool.images[0] ? (
                <img
                  src={booking.tool.images[0]}
                  alt={booking.tool.name}
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <span className="text-gray-400">Aucune image</span>
              )}
              {/* Badge statut */}
              <div className="absolute top-2 left-2">
                <BookingStatus
                  status={booking.status}
                  onUpdate={(status) => handleStatusUpdate(booking.id, status)}
                  isOwner={userId === booking.userId}
                />
              </div>
              <div className="absolute top-2 right-2">
                <PaymentStatus
                  status={booking.paymentStatus}
                  onUpdate={(status) =>
                    handlePaymentStatusUpdate(booking.id, status)
                  }
                  isOwner={userId === booking.userId}
                />
              </div>
            </div>
            {/* Contenu */}
            <div className="flex-1 flex flex-col justify-between p-4">
              <div>
                <h3 className="text-base font-semibold text-indigo-700 mb-1 flex items-center gap-2 truncate">
                  <CreditCardIcon className="w-4 h-4 text-indigo-400" />
                  {booking.tool?.name || "Outil inconnu"}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <CalendarDaysIcon className="w-3 h-3 text-blue-400" />
                  Du{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </span>{" "}
                  au{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <span className="font-medium text-green-600">
                    {booking.totalPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Total
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <span className="font-medium text-yellow-600">
                    Caution : {booking.deposit.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-end items-center">
                <Link
                  href={`/bookings/${booking.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-xs font-semibold shadow hover:scale-105 hover:shadow-lg transition-transform duration-200"
                  title="Voir les détails de la réservation"
                >
                  Détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
