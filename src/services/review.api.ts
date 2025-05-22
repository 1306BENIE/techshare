import { Review, ReviewFilters } from "@/interfaces/review/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { ApiResponse } from "@/interfaces/common/api.types";
import axios from "axios";

export class ReviewApiService {
  async getReviews(
    filters: ReviewFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 }
  ): Promise<ApiResponse<Review[]>> {
    try {
      const queryParams = new URLSearchParams();

      // Ajouter les filtres
      if (filters.userId) queryParams.append("userId", filters.userId);
      if (filters.toolId) queryParams.append("toolId", filters.toolId);
      if (filters.minRating)
        queryParams.append("minRating", filters.minRating.toString());
      if (filters.maxRating)
        queryParams.append("maxRating", filters.maxRating.toString());
      if (filters.startDate)
        queryParams.append("startDate", filters.startDate.toISOString());
      if (filters.endDate)
        queryParams.append("endDate", filters.endDate.toISOString());

      // Ajouter la pagination avec des valeurs par défaut
      queryParams.append("page", (pagination.page || 1).toString());
      queryParams.append("limit", (pagination.limit || 10).toString());
      if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
      if (pagination.sortOrder)
        queryParams.append("sortOrder", pagination.sortOrder);

      const response = await axios.get(
        `/api/reviews?${queryParams.toString()}`
      );
      return response.data as ApiResponse<Review[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getReviewById(id: string): Promise<ApiResponse<Review>> {
    try {
      const response = await axios.get(`/api/reviews/${id}`);
      return response.data as ApiResponse<Review>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createReview(reviewData: {
    toolId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }): Promise<ApiResponse<Review>> {
    try {
      const response = await axios.post("/api/reviews", reviewData);
      return response.data as ApiResponse<Review>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateReview(
    id: string,
    reviewData: Partial<Review>
  ): Promise<ApiResponse<Review>> {
    try {
      const response = await axios.put(`/api/reviews/${id}`, reviewData);
      return response.data as ApiResponse<Review>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteReview(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete(`/api/reviews/${id}`);
      return response.data as ApiResponse<void>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getReviewsByUser(userId: string): Promise<ApiResponse<Review[]>> {
    try {
      const response = await axios.get(`/api/reviews/user/${userId}`);
      return response.data as ApiResponse<Review[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getReviewsByTool(toolId: string): Promise<ApiResponse<Review[]>> {
    try {
      const response = await axios.get(`/api/reviews/tool/${toolId}`);
      return response.data as ApiResponse<Review[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
