import { Booking, BookingFilters } from "@/interfaces/booking";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { ApiResponse } from "@/interfaces/common/api.types";
import axios from "axios";

export class BookingApiService {
  async getBookings(
    filters: BookingFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 }
  ): Promise<ApiResponse<Booking[]>> {
    try {
      const queryParams = new URLSearchParams();

      // Ajouter les filtres
      if (filters.userId) queryParams.append("userId", filters.userId);
      if (filters.toolId) queryParams.append("toolId", filters.toolId);
      if (filters.status) queryParams.append("status", filters.status);
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
        `/api/bookings?${queryParams.toString()}`
      );
      return response.data as ApiResponse<Booking[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    try {
      const response = await axios.get(`/api/bookings/${id}`);
      return response.data as ApiResponse<Booking>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createBooking(bookingData: {
    toolId: string;
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<Booking>> {
    try {
      const response = await axios.post("/api/bookings", bookingData);
      return response.data as ApiResponse<Booking>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateBookingStatus(
    id: string,
    status: "CONFIRMED" | "CANCELLED" | "COMPLETED"
  ): Promise<ApiResponse<Booking>> {
    try {
      const response = await axios.patch(`/api/bookings/${id}/status`, {
        status,
      });
      return response.data as ApiResponse<Booking>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getBookingsByUser(userId: string): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await axios.get(`/api/bookings/user/${userId}`);
      return response.data as ApiResponse<Booking[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getBookingsByTool(toolId: string): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await axios.get(`/api/bookings/tool/${toolId}`);
      return response.data as ApiResponse<Booking[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
