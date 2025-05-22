export interface UserFilters {
  search?: string;
  role?: "USER" | "ADMIN";
  isVerified?: boolean;
  city?: string;
  country?: string;
  minRating?: number;
  maxRating?: number;
}
