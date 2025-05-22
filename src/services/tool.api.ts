import { Tool, ToolFilters } from "@/interfaces/tool/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { ApiResponse } from "@/interfaces/common/api.types";
import axios from "axios";

export class ToolApiService {
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

  async getTools(
    filters: ToolFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 }
  ): Promise<ApiResponse<Tool[]>> {
    try {
      const queryParams = new URLSearchParams();

      // Ajouter les filtres
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.minPrice)
        queryParams.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice)
        queryParams.append("maxPrice", filters.maxPrice.toString());
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.country) queryParams.append("country", filters.country);

      // Ajouter la pagination avec des valeurs par défaut
      queryParams.append("page", (pagination.page || 1).toString());
      queryParams.append("limit", (pagination.limit || 10).toString());
      if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
      if (pagination.sortOrder)
        queryParams.append("sortOrder", pagination.sortOrder);

      const baseUrl = this.getBaseUrl();
      const response = await axios.get(
        `${baseUrl}/api/tools?${queryParams.toString()}`
      );
      return response.data as ApiResponse<Tool[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getToolById(id: string): Promise<ApiResponse<Tool>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.get(`${baseUrl}/api/tools/${id}`);
      return response.data as ApiResponse<Tool>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createTool(toolData: Partial<Tool>): Promise<ApiResponse<Tool>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.post(`${baseUrl}/api/tools`, toolData);
      return response.data as ApiResponse<Tool>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateTool(
    id: string,
    toolData: Partial<Tool>
  ): Promise<ApiResponse<Tool>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.put(`${baseUrl}/api/tools/${id}`, toolData);
      return response.data as ApiResponse<Tool>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteTool(id: string): Promise<ApiResponse<void>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.delete(`${baseUrl}/api/tools/${id}`);
      return response.data as ApiResponse<void>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getToolsByOwner(ownerId: string): Promise<ApiResponse<Tool[]>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.get(`${baseUrl}/api/tools/owner/${ownerId}`);
      return response.data as ApiResponse<Tool[]>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateToolStatus(
    id: string,
    status: "AVAILABLE" | "RENTED" | "MAINTENANCE"
  ): Promise<ApiResponse<Tool>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.patch(`${baseUrl}/api/tools/${id}/status`, {
        status,
      });
      return response.data as ApiResponse<Tool>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async checkToolAvailability(
    id: string,
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<{ isAvailable: boolean }>> {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await axios.post(
        `${baseUrl}/api/tools/${id}/availability`,
        {
          startDate,
          endDate,
        }
      );
      return response.data as ApiResponse<{ isAvailable: boolean }>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
