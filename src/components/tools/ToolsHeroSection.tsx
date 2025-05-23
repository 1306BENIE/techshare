"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ToolsHeroSection() {
  return (
    <section className="py-12 text-center relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-lg"
      >
        Outils disponibles
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-2xl text-gray-600 mb-6"
      >
        Trouve l'outil parfait pour tes projets tech, en toute confiance.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex justify-center gap-4 mb-6"
      >
        <Link href="/tools/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
            <Plus className="w-5 h-5 mr-2" /> Ajouter un outil
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
