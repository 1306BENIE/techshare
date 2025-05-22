"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BookingNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow mb-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <Link
            href="/"
            className="py-4 px-2 font-medium text-sm text-gray-400 hover:text-blue-600 hover:underline transition"
          >
            Accueil
          </Link>
          <Link
            href="/bookings"
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              isActive("/bookings")
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Mes réservations
          </Link>
          <Link
            href="/bookings/received"
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              isActive("/bookings/received")
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Réservations reçues
          </Link>
          <Link
            href="/bookings/new"
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              isActive("/bookings/new")
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Nouvelle réservation
          </Link>
        </div>
      </div>
    </nav>
  );
}
