export interface Review {
  id: string;
  userId: string;
  toolId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewFilters {
  userId?: string;
  toolId?: string;
  minRating?: number;
  maxRating?: number;
  startDate?: Date;
  endDate?: Date;
}
