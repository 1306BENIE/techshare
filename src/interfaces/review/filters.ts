export interface ReviewFilters {
  toolId?: string;
  userId?: string;
  type?: "TOOL" | "USER";
  minRating?: number;
  maxRating?: number;
  startDate?: Date;
  endDate?: Date;
}
