"use client";

import React from "react";
import { Tool } from "@/interfaces/tool/types";
import { ToolList } from "./ToolList";
import { ToolFilters } from "./ToolFilters";

interface ToolsContainerProps {
  initialTools: Tool[];
  initialPagination: {
    totalPages: number;
    currentPage: number;
  };
  initialFilters: {
    search?: string;
    category?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export function ToolsContainer({
  initialTools,
  initialPagination,
  initialFilters,
}: ToolsContainerProps) {
  return (
    <div className="space-y-8">
      <ToolFilters initialFilters={initialFilters} />
      <ToolList
        tools={initialTools}
        totalPages={initialPagination.totalPages}
        currentPage={initialPagination.currentPage}
      />
    </div>
  );
}
