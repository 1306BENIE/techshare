"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { MultiStepToolForm } from "@/components/tools/MultiStepToolForm";

export function CreateToolAnimatedForm() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100/60 to-white py-0">
      {/* Hero animé */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col items-center justify-center py-12 mb-2"
      >
        <h1 className="text-xl md:text-5xl font-extrabold text-blue-900 mb-2 text-center drop-shadow-lg">
          Ajoute un outil à la communauté
        </h1>
        <p className="text-md text-gray-600 text-center max-w-xl mx-auto">
          Partage tes outils et aide d'autres passionnés à réaliser leurs
          projets. Remplis ce formulaire en quelques étapes simples et rapides !
        </p>
      </motion.div>

      {/* Carte formulaire animée */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 relative"
      >
        {/* Bouton retour stylé */}
        <Link href="/tools" className="absolute -top-12 left-0">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la liste
          </Button>
        </Link>
        <MultiStepToolForm />
      </motion.div>
    </div>
  );
}
