import { Review, ReviewFilters } from "@/interfaces/review/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { ApiResponse } from "@/interfaces/common/api.types";
import axios from "axios";

export class ReviewApiService {
  private getBaseUrl() {
    // En production, utiliser l'URL absolue
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }

    // En développement local
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }

    // En production sans URL définie, utiliser l'URL relative
    return "";
  }

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

      const baseUrl = this.getBaseUrl();
      const url = `${baseUrl}/api/reviews?${queryParams.toString()}`;

      const response = await axios.get(url);
      return response.data as ApiResponse<Review[]>;
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      throw new Error(error.message || "Failed to fetch reviews");
    }
  }

  async getReviewById(id: string): Promise<ApiResponse<Review>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.get(`${baseUrl}/api/reviews/${id}`);
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
      const baseUrl = this.getBaseUrl();
      const response = await axios.get(`${baseUrl}/api/reviews/user/${userId}`);
      return response.data as ApiResponse<Review[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getReviewsByTool(toolId: string): Promise<ApiResponse<Review[]>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.get(`${baseUrl}/api/reviews/tool/${toolId}`);
      return response.data as ApiResponse<Review[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
