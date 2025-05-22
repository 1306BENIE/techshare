import Link from "next/link";
import { Tool } from "@/interfaces/tool/types";

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Link
      href={`/tools/${tool._id}`}
      className="group block bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 hover:-translate-y-1 hover:scale-[1.03] cursor-pointer overflow-hidden"
    >
      <div className="relative h-48 ">
        <img
          src={tool.images[0] || "/placeholder.jpg"}
          alt={tool.name}
          className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold tracking-wide border-2 border-white group-hover:scale-110 transition-transform duration-300">
          {tool.price.toLocaleString("fr-FR")} FCFA/jour
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-blue-800 truncate mb-1 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-1">
          {tool.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white/70 px-2 py-1 rounded-full shadow-sm">
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {tool.location.city}, {tool.location.country}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              tool.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {tool.status === "AVAILABLE" ? "Disponible" : "Indisponible"}
          </span>
        </div>
      </div>
    </Link>
  );
};
