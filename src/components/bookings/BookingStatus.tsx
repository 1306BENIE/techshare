"use client";

import React from "react";

interface BookingStatusProps {
  status: string;
  onUpdate?: (status: string) => void;
  isOwner: boolean;
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  COMPLETED: "Terminée",
  CANCELLED: "Annulée",
};

export function BookingStatus({
  status,
  onUpdate,
  isOwner,
}: BookingStatusProps) {
  const color =
    statusColors[status as keyof typeof statusColors] ||
    "bg-gray-100 text-gray-800";
  const label = statusLabels[status as keyof typeof statusLabels] || status;

  return (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
      {isOwner && onUpdate && status === "PENDING" && (
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate("CONFIRMED")}
            className="text-xs text-green-600 hover:text-green-800"
          >
            Confirmer
          </button>
          <button
            onClick={() => onUpdate("CANCELLED")}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}
