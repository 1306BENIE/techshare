import { User, UserFilters, UserProfile } from "@/interfaces/user/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { ApiResponse } from "@/interfaces/common/api.types";
import axios from "axios";
import { ENDPOINTS } from "@/constants/endpoints";

export class UserApiService {
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

  async getUsers(
    filters: UserFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 }
  ): Promise<ApiResponse<User[]>> {
    try {
      const queryParams = new URLSearchParams();

      // Ajouter les filtres
      if (filters.role) queryParams.append("role", filters.role);
      if (filters.isVerified !== undefined)
        queryParams.append("isVerified", filters.isVerified.toString());
      if (filters.search) queryParams.append("search", filters.search);

      // Ajouter la pagination avec des valeurs par défaut
      queryParams.append("page", (pagination.page || 1).toString());
      queryParams.append("limit", (pagination.limit || 10).toString());
      if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
      if (pagination.sortOrder)
        queryParams.append("sortOrder", pagination.sortOrder);

      const baseUrl = this.getBaseUrl();
      const url = `${baseUrl}/api/users?${queryParams.toString()}`;

      const response = await axios.get(url);
      return response.data as ApiResponse<User[]>;
    } catch (error: any) {
      console.error("Error fetching users:", error);
      throw new Error(error.message || "Failed to fetch users");
    }
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await axios.get(`/api/users/${id}`);
      return response.data as ApiResponse<User>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserProfile(id: string): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await axios.get(`/api/users/${id}/profile`);
      return response.data as ApiResponse<UserProfile>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<ApiResponse<User>> {
    try {
      const response = await axios.put(`/api/users/${id}`, userData);
      return response.data as ApiResponse<User>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete(`/api/users/${id}`);
      return response.data as ApiResponse<void>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async verifyUser(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await axios.post(ENDPOINTS.USERS.VERIFY(id));
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Erreur lors de la vérification"
        );
      }
      throw new Error("Erreur de connexion au serveur");
    }
  }

  // Méthodes d'authentification
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      return response.data as ApiResponse<{ user: User; token: string }>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async register(
    userData: Partial<User>
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await axios.post("/api/auth/register", userData);
      return response.data as ApiResponse<{ user: User; token: string }>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await axios.post("/api/auth/logout");
      return response.data as ApiResponse<void>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await axios.get("/api/auth/me");
      return response.data as ApiResponse<User>;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
