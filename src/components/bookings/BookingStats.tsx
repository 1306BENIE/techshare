import React from "react";
import { BookingResponse } from "@/interfaces/booking";

interface BookingStatsProps {
  bookings: BookingResponse[];
}

export function BookingStats({ bookings }: BookingStatsProps) {
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
    totalRevenue: bookings
      .filter((b) => b.status === "COMPLETED" && b.paymentStatus === "PAID")
      .reduce((sum, b) => sum + b.totalPrice, 0),
    pendingPayments: bookings
      .filter((b) => b.paymentStatus === "PENDING")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">
          Total des réservations
        </h3>
        <p className="text-2xl font-bold">{stats.total}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>En attente: {stats.pending}</p>
          <p>Confirmées: {stats.confirmed}</p>
          <p>Terminées: {stats.completed}</p>
          <p>Annulées: {stats.cancelled}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Revenus totaux</h3>
        <p className="text-2xl font-bold">
          {stats.totalRevenue.toLocaleString("fr-FR")} FCFA
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Paiements en attente: {stats.pendingPayments.toLocaleString("fr-FR")}{" "}
          FCFA
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">
          Taux de conversion
        </h3>
        <p className="text-2xl font-bold">
          {stats.total > 0
            ? Math.round((stats.confirmed / stats.total) * 100)
            : 0}
          %
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {stats.confirmed} confirmées sur {stats.total} demandes
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">
          Taux de complétion
        </h3>
        <p className="text-2xl font-bold">
          {stats.confirmed > 0
            ? Math.round((stats.completed / stats.confirmed) * 100)
            : 0}
          %
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {stats.completed} terminées sur {stats.confirmed} confirmées
        </p>
      </div>
    </div>
  );
}
