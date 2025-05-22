import React from "react";
import { User } from "@/interfaces/user";
import Link from "next/link";

interface UserProfileDetailsProps {
  profile: User;
}

export function UserProfileDetails({ profile }: UserProfileDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">{profile.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  profile.isVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {profile.isVerified ? "Vérifié" : "Non vérifié"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  profile.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {profile.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Informations personnelles
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Adresse</p>
                  <p className="font-medium">
                    {profile.address.street}
                    <br />
                    {profile.address.postalCode} {profile.address.city}
                    <br />
                    {profile.address.country}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Membre depuis</p>
                  <p className="font-medium">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Nombre de réservations</p>
                  <p className="font-medium">0</p>
                </div>
                <div>
                  <p className="text-gray-600">Nombre d'avis</p>
                  <p className="font-medium">0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href={`/users/${profile._id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Modifier le profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
