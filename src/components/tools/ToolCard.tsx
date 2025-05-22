"use client";

import React from "react";
import { Tool } from "@/interfaces/tool/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Trash2, MapPin, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const router = useRouter();

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return "/placeholder-tool.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    // Si le chemin commence par /api/, on le remplace par /
    if (imagePath.startsWith("/api/")) {
      return imagePath.replace("/api/", "/");
    }
    return imagePath;
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      const response = await fetch(`/api/tools/${tool._id}/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'image");
      }

      // Rafraîchir la page pour voir les changements
      router.refresh();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/tools/${tool._id}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
          <CardHeader className="p-0">
            <div className="relative aspect-[4/3] group">
              <Image
                src={getImageUrl(tool.images?.[0])}
                alt={tool.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Badge
                className="absolute top-3 right-3 z-10"
                variant={
                  tool.status === "AVAILABLE" ? "default" : "destructive"
                }
              >
                {tool.status === "AVAILABLE" ? "Disponible" : "Indisponible"}
              </Badge>
              {tool.images?.[0] && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteImage(tool.images[0]);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <Badge variant="secondary" className="ml-2">
                {tool.specifications?.condition || "Non spécifié"}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
              {tool.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{tool.location?.city || "Non spécifié"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Disponible maintenant</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">4.8</span>
                <span className="text-gray-500">(24 avis)</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {tool.price.toLocaleString("fr-FR")} FCFA
                <span className="text-sm text-gray-500">/jour</span>
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
              Voir les détails
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
