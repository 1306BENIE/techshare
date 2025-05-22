import React from "react";
import { Review } from "@/interfaces/review";
import Link from "next/link";

interface ReviewDetailsProps {
  review: Review;
}

export function ReviewDetails({ review }: ReviewDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold">Détails de l'avis</h1>
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${
                      index < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Informations de l'outil
              </h2>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <img
                    src={review.tool.images[0]}
                    alt={review.tool.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{review.tool.name}</h3>
                    <p className="text-gray-600">{review.tool.category}</p>
                    <p className="text-gray-600">
                      {review.tool.location.city},{" "}
                      {review.tool.location.country}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Prix par jour</p>
                  <p className="font-medium">
                    {review.tool.pricePerDay.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Avis</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Commentaire</p>
                  <p className="font-medium mt-2">{review.comment}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Auteur</h2>
            <div className="flex items-center space-x-4">
              <img
                src={review.user.avatar}
                alt={review.user.firstName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">
                  {review.user.firstName} {review.user.lastName}
                </p>
                <p className="text-gray-600">
                  Membre depuis {new Date(review.user.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href={`/tools/${review.tool._id}`}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Voir l'outil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
