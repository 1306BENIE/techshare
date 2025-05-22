import React from "react";
import { Review } from "@/interfaces/review";
import Link from "next/link";

// Étendre le type Review pour inclure tool et user
interface ExtendedReview extends Review {
  tool?: {
    name: string;
    images: string[];
    category: string;
    location: {
      city: string;
      country: string;
    };
    pricePerDay: number;
    _id: string;
  };
  user?: {
    name: string;
    email: string;
  };
}

interface ReviewDetailsProps {
  review: ExtendedReview;
}

export function ReviewDetails({ review }: ReviewDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Détails de l'avis</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Note</h3>
          <p className="text-gray-700">{review.rating} / 5</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Commentaire</h3>
          <p className="text-gray-700">{review.comment}</p>
        </div>
        {review.tool && (
          <div>
            <h3 className="text-lg font-semibold">Outil</h3>
            <div className="flex space-x-4">
              <img
                src={review.tool.images[0]}
                alt={review.tool.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium">{review.tool.name}</p>
                <p className="text-gray-600">
                  Catégorie: {review.tool.category}
                </p>
                <p className="text-gray-600">
                  Localisation: {review.tool.location.city},{" "}
                  {review.tool.location.country}
                </p>
                <p className="text-gray-600">
                  Prix par jour:{" "}
                  {review.tool.pricePerDay.toLocaleString("fr-FR")} FCFA
                </p>
                <Link
                  href={`/tools/${review.tool._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Voir l'outil
                </Link>
              </div>
            </div>
          </div>
        )}
        {review.user && (
          <div>
            <h3 className="text-lg font-semibold">Utilisateur</h3>
            <p className="text-gray-700">{review.user.name}</p>
            <p className="text-gray-700">{review.user.email}</p>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">Date</h3>
          <p className="text-gray-700">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
