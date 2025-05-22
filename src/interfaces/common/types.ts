export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SortOrder = "asc" | "desc";

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  city: string;
  postalCode: string;
  country: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export type Status = "ACTIVE" | "INACTIVE" | "DELETED";
