import React from "react";
import { BookingResponse } from "@/interfaces/booking";

interface BookingNotificationsProps {
  bookings: BookingResponse[];
}

export function BookingNotifications({ bookings }: BookingNotificationsProps) {
  const notifications = [
    {
      type: "new",
      count: bookings.filter((b) => b.status === "PENDING").length,
      message: "nouvelles réservations en attente",
    },
    {
      type: "payment",
      count: bookings.filter((b) => b.paymentStatus === "PENDING").length,
      message: "paiements en attente",
    },
    {
      type: "upcoming",
      count: bookings.filter(
        (b) =>
          b.status === "CONFIRMED" &&
          new Date(b.startDate).getTime() - new Date().getTime() <
            24 * 60 * 60 * 1000
      ).length,
      message: "réservations commençant dans moins de 24h",
    },
  ].filter((n) => n.count > 0);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {notifications.map((notification) => (
        <div
          key={notification.type}
          className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-bold">{notification.count}</span>{" "}
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
