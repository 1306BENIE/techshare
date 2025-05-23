import { Suspense } from "react";
import { ToolList } from "@/components/tools/ToolList";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { getToolsServer } from "@/lib/getToolsServer";

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const { tools, pagination } = await getToolsServer({
    search: searchParams.search as string,
    category: searchParams.category as string,
    condition: searchParams.condition as string,
    minPrice: searchParams.minPrice as string,
    maxPrice: searchParams.maxPrice as string,
    page,
    limit,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Lien Accueil */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-md bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 hover:text-blue-900 transition"
            >
              Accueil
            </Link>
          </div>
          {/* En-tête */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Outils disponibles
              </h1>
              <p className="text-gray-500">
                Découvrez notre sélection d'outils de qualité
              </p>
            </div>
            <Link href="/tools/create">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un outil
              </Button>
            </Link>
          </div>

          {/* Barre de recherche mobile */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un outil..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtres */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="flex items-center gap-2 mb-4 lg:hidden">
                  <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filtres
                  </h2>
                </div>
                <ToolFilters initialFilters={searchParams} />
              </div>
            </div>

            {/* Liste des outils */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm animate-pulse"
                      >
                        <div className="aspect-[4/3] bg-gray-200 rounded-t-lg" />
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-200 rounded w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              >
                <ToolList
                  tools={tools}
                  totalPages={pagination.totalPages}
                  currentPage={pagination.page}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
