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
import { MapPin, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const router = useRouter();

  // Détermine la couleur et le style du badge de statut
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

  // Badge "New" si besoin (exemple)
  // const isNew = ...
  // const newBadge = isNew ? (
  //   <span className="inline-block px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 text-xs font-semibold ml-2">New</span>
  // ) : null;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 border hover:border-blue-200"
    >
      <Link
        href={`/tools/${tool._id}`}
        className="block group focus:outline-none"
      >
        <Card className="overflow-hidden border-0 bg-white">
          <CardHeader className="p-0">
            <div className="relative aspect-[4/3] group">
              <Image
                src={tool.images?.[0] || "/placeholder-tool.jpg"}
                alt={tool.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute top-3 left-3 z-10">{statusBadge}</div>
            </div>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <Badge
                variant="secondary"
                className="ml-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border-none"
              >
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
              <span className="text-lg font-bold text-blue-600">
                {tool.price.toLocaleString("fr-FR")} FCFA
                <span className="text-sm text-gray-500">/jour</span>
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition-colors text-base py-2"
              tabIndex={-1}
            >
              Voir les détails
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
