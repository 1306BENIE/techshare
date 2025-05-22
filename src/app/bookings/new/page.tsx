import React from "react";
import { BookingForm } from "@/components/bookings/BookingForm";
import { redirect } from "next/navigation";

interface NewBookingPageProps {
  searchParams: { toolId: string };
}

export default function NewBookingPage({ searchParams }: NewBookingPageProps) {
  const { toolId } = searchParams;

  if (!toolId) {
    redirect("/tools");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Nouvelle réservation</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <BookingForm toolId={toolId} />
        </div>
      </div>
    </div>
  );
}
