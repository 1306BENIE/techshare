import { ToolCategory } from "./types";

export interface ToolFilters {
  category?: ToolCategory;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  availability?: {
    startDate: Date;
    endDate: Date;
  };
  condition?: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR";
  search?: string;
  status?: "AVAILABLE" | "RENTED" | "MAINTENANCE" | "DELETED";
  minRating?: number;
  maxRating?: number;
}
