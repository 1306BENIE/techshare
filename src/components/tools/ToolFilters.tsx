"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface ToolFiltersProps {
  initialFilters: {
    search?: string;
    category?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export function ToolFilters({ initialFilters }: ToolFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState((initialFilters.search as string) || "");
  const [category, setCategory] = useState(
    (initialFilters.category as string) || "ALL"
  );
  const [condition, setCondition] = useState(
    (initialFilters.condition as string) || "ALL"
  );
  const [minPrice, setMinPrice] = useState(
    (initialFilters.minPrice as string) || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    (initialFilters.maxPrice as string) || ""
  );

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    if (category && category !== "ALL") params.set("category", category);
    if (condition && condition !== "ALL") params.set("condition", condition);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    params.set("page", "1");
    router.push(`/tools?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("ALL");
    setCondition("ALL");
    setMinPrice("");
    setMaxPrice("");
    router.push("/tools");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-300"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recherche
          </label>
          <div className="relative">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un outil..."
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="transition-all duration-200 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="ALL">Toutes les catégories</SelectItem>
                <SelectItem value="LAPTOP">Ordinateur portable</SelectItem>
                <SelectItem value="DESKTOP">Ordinateur Bureau</SelectItem>
                <SelectItem value="CAMERA">Camera</SelectItem>
                <SelectItem value="Imprimante">Imprimante</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              État
            </label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="transition-all duration-200 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Tous les états" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="ALL">Tous les états</SelectItem>
                <SelectItem value="NEW">Neuf</SelectItem>
                <SelectItem value="LIKE_NEW">Comme neuf</SelectItem>
                <SelectItem value="GOOD">Bon</SelectItem>
                <SelectItem value="FAIR">Moyen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix min (FCFA)
            </label>
            <div className="relative">
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="FCFA"
                min="0"
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix max (FCFA)
            </label>
            <div className="relative">
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="FCFA"
                min="0"
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t mt-6">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1 gap-2 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
        >
          <X className="h-4 w-4" />
          Réinitialiser
        </Button>
        <Button
          onClick={handleFilter}
          className="flex-1 text-[#fff] gap-2 bg-blue-700 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
        >
          <Filter className="h-4 w-4" />
          Filtrer
        </Button>
      </div>
    </motion.div>
  );
}
