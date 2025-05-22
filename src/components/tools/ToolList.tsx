"use client";

import React from "react";
import { Tool } from "@/interfaces/tool/types";
import { ToolCard } from "./ToolCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface ToolListProps {
  tools: Tool[];
  totalPages: number;
  currentPage: number;
  isLoading?: boolean;
}

export function ToolList({
  tools,
  totalPages,
  currentPage,
  isLoading = false,
}: ToolListProps) {
  const searchParams = useSearchParams();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[4/3] rounded-lg" />
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 bg-white rounded-lg shadow-sm"
      >
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun outil trouvé
          </h3>
          <p className="text-gray-500 mb-6">
            Essayez de modifier vos critères de recherche ou de réinitialiser
            les filtres
          </p>
          <Link href="/tools">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Réinitialiser les filtres
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/tools?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <Pagination>
            <PaginationContent className="bg-white rounded-lg shadow-sm p-2">
              <PaginationItem>
                <Link
                  href={createPageUrl(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-gray-100 rounded-md transition-colors"
                  }
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                >
                  <PaginationPrevious disabled={currentPage === 1} />
                </Link>
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <Link
                      href={createPageUrl(page)}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </Link>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <Link
                  href={createPageUrl(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-gray-100 rounded-md transition-colors"
                  }
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                >
                  <PaginationNext disabled={currentPage === totalPages} />
                </Link>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
