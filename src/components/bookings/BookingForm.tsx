"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  CalendarDaysIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const bookingSchema = z
  .object({
    startDate: z.string().min(1, "La date de début est requise"),
    endDate: z.string().min(1, "La date de fin est requise"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "La date de fin doit être postérieure à la date de début",
      path: ["endDate"],
    }
  );

interface BookingFormProps {
  toolId: string;
}

type FormData = z.infer<typeof bookingSchema>;

export function BookingForm({ toolId }: BookingFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(bookingSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleFormSubmit = async (data: FormData) => {
    if (!session?.user?.id) {
      setError("Vous devez être connecté pour effectuer une réservation");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await axios.post(`/api/bookings`, {
        toolId,
        userId: session.user.id,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalPrice: 0, // Sera calculé côté serveur
        deposit: 0, // Sera calculé côté serveur
      });
      router.push("/bookings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Couleurs personnalisées
  const primaryColor = "#2563eb"; // bleu profond
  const accentColor = "#fbbf24"; // jaune accent
  const bgLight = "#f8fafc";

  return (
    <div className="rounded-2xl shadow-xl border border-gray-100 bg-white overflow-hidden">
      {/* Header visuel */}
      <div className="flex items-center gap-4 px-6 py-6 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="bg-white rounded-full p-3 shadow-md">
          <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            Réservez votre outil
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Choisissez vos dates et validez en un clic
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="px-6 py-8 space-y-8"
      >
        {/* Feedback d'erreur */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Champs de dates modernisés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Date de début
            </label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                {...register("startDate")}
                className={`peer block w-full rounded-lg border px-4 py-3 pr-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all ${
                  errors.startDate ? "border-red-400" : "border-gray-300"
                }`}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {errors.startDate && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.startDate.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Date de fin
            </label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                {...register("endDate")}
                className={`peer block w-full rounded-lg border px-4 py-3 pr-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all ${
                  errors.endDate ? "border-red-400" : "border-gray-300"
                }`}
                min={startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
            {errors.endDate && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.endDate.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Résumé dynamique */}
        {startDate && endDate && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-4">
            <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm text-blue-900 font-semibold">
                Du <span className="font-bold">{startDate}</span> au{" "}
                <span className="font-bold">{endDate}</span>{" "}
                <span className="mx-2">•</span>
                <span className="text-blue-700">
                  {calculateDuration()} jour{calculateDuration() > 1 ? "s" : ""}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all font-medium shadow-sm"
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-7 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Réservation en cours..." : "Réserver"}
          </button>
        </div>
      </form>
    </div>
  );
}
