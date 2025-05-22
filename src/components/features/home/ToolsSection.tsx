import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ToolCard } from "./ToolCard";
import { useTools } from "@/hooks/useTools";

export const ToolsSection = () => {
  const { tools, loading, error } = useTools();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Outils disponibles</h2>
          <Link
            href="/tools"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            Voir tout
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tools.slice(0, 6).map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
