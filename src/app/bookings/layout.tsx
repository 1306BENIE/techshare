import React from "react";
import { BookingNav } from "@/components/bookings/BookingNav";

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BookingNav />
      {children}
    </div>
  );
}
