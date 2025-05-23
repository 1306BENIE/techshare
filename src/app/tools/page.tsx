import { Suspense } from "react";
import { ToolList } from "@/components/tools/ToolList";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { getToolsServer } from "@/lib/getToolsServer";
import { ToolsHeroSection } from "@/components/tools/ToolsHeroSection";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <ToolsHeroSection />

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filtres et contenu principal */}
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
