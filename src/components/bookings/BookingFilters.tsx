import React from "react";
import { BookingStatus, PaymentStatus } from "@/interfaces/booking";

interface BookingFiltersProps {
  onFilterChange: (filters: {
    status?: BookingStatus;
    paymentStatus?: PaymentStatus;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

export function BookingFilters({ onFilterChange }: BookingFiltersProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value || undefined });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Recherche
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Rechercher..."
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Statut
          </label>
          <select
            id="status"
            name="status"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="CONFIRMED">Confirmée</option>
            <option value="COMPLETED">Terminée</option>
            <option value="CANCELLED">Annulée</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="paymentStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Statut du paiement
          </label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Tous les paiements</option>
            <option value="PENDING">En attente</option>
            <option value="PAID">Payé</option>
            <option value="REFUNDED">Remboursé</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dateRange"
            className="block text-sm font-medium text-gray-700"
          >
            Période
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
