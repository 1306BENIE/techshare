import React from "react";
import { Tool } from "@/interfaces/tool/types";
import Link from "next/link";

interface ToolDetailsProps {
  tool: Tool;
}

export function ToolDetails({ tool }: ToolDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative h-96">
            <img
              src={tool.images[0]}
              alt={tool.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  tool.status === "AVAILABLE"
                    ? "bg-green-100 text-green-800"
                    : tool.status === "RENTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {tool.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {tool.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-24">
                <img
                  src={image}
                  alt={`${tool.name} - Image ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Détails</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Catégorie</p>
                  <p className="font-medium">{tool.category}</p>
                </div>
                <div>
                  <p className="text-gray-600">Prix par jour</p>
                  <p className="font-medium">
                    {tool.price.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Localisation</p>
                  <p className="font-medium">
                    {tool.location.city}, {tool.location.country}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">État</p>
                  <p className="font-medium">{tool.specifications.condition}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/tools/${tool._id}/book`}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Réserver cet outil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
