"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MapPin, X } from "lucide-react";
import { ReserveButton } from "@/components/tools/ReserveButton";
import { formatPrice } from "@/utils/format";
import Link from "next/link";

export function ToolDetailsAnimated({ tool }: { tool: any }) {
  // Badge pro pour le statut
  const statusBadge =
    tool.status === "AVAILABLE" ? (
      <span className="inline-block px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold">
        Disponible
      </span>
    ) : (
      <span className="inline-block px-2 py-0.5 rounded-md bg-gray-200 text-gray-500 text-xs font-semibold">
        Indisponible
      </span>
    );

  // Badge pro pour la catégorie
  const categoryBadge = (
    <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
      {tool.category}
    </span>
  );

  // Badge pro pour l'état
  const conditionBadge = tool.specifications?.condition && (
    <span className="inline-block px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 text-xs font-semibold">
      {tool.specifications.condition}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl mx-auto p-2 md:p-6 relative"
    >
      {/* Bouton croix pour retour */}
      <Link
        href="/tools"
        className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white rounded-full p-1 shadow transition"
      >
        <X className="w-6 h-6 text-gray-500 hover:text-blue-600" />
      </Link>
      <div className="bg-white overflow-hidden flex flex-col md:flex-row md:h-[440px]">
        {/* Image principale à gauche */}
        <div className="relative w-full md:w-1/2 md:h-full">
          <Image
            src={tool.images[0] || "/placeholder-tool.jpg"}
            alt={tool.name}
            fill
            className="object-cover md:rounded-l-2xl"
            priority
          />
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {statusBadge}
            {categoryBadge}
            {conditionBadge}
          </div>
        </div>

        {/* Infos à droite */}
        <div className="flex-1 flex flex-col justify-between h-full p-5 md:p-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-900 flex items-center gap-2">
              {tool.name}
            </h1>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-gray-600 text-sm">
                {tool.location?.city}, {tool.location?.country}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-base leading-relaxed line-clamp-3">
              {tool.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div>
                <span className="text-gray-500">Prix journalier</span>
                <div className="text-xl font-bold text-blue-600">
                  {formatPrice(tool.pricePerDay)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Caution</span>
                <div className="font-bold">{formatPrice(tool.deposit)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-gray-500 text-sm">Marque</span>
                <div className="font-medium">
                  {tool.specifications?.brand || "-"}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Modèle</span>
                <div className="font-medium">
                  {tool.specifications?.model || "-"}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <ReserveButton toolId={tool._id} />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                {tool.owner?.firstName?.[0]}
              </div>
              <div>
                <div className="font-medium">
                  {tool.owner?.firstName} {tool.owner?.lastName}
                </div>
                <div className="text-sm text-gray-500">{tool.owner?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images secondaires */}
      {tool.images.length > 1 && (
        <div className="flex flex-col gap-2 items-center justify-start mt-6">
          <div className="grid grid-cols-3 gap-2">
            {tool.images.slice(1).map((image: string, index: number) => (
              <div
                key={index}
                className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={image}
                  alt={`${tool.name} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Avis toujours affichés */}
      <div className="flex items-center gap-2 mt-4 justify-center">
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        <span className="font-semibold text-lg">4.8</span>
        <span className="text-gray-500 text-sm">(24 avis)</span>
      </div>
    </motion.div>
  );
}
