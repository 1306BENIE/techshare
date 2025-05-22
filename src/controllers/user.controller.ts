import { Request, Response } from "express";
import { UserService } from "@/services/user.service";
import { UserFilters } from "@/interfaces/user";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { User } from "@/interfaces/user";

interface Filters {
  search?: string;
  role?: "USER" | "ADMIN";
  isVerified?: boolean;
  city?: string;
  country?: string;
}

interface Pagination {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Crée un nouvel utilisateur
   * @param data - Données de l'utilisateur
   */
  async createUser(data: any) {
    try {
      const user = await this.userService.createUser(data);
      return { success: true, data: user };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Récupère un utilisateur par son ID
   * @param id - ID de l'utilisateur
   */
  async getUserById(id: string) {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      return { success: true, data: user };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Récupère le profil d'un utilisateur
   * @param id - ID de l'utilisateur
   */
  async getUserProfile(id: string) {
    try {
      const profile = await this.userService.getUserProfile(id);
      if (!profile) {
        throw new Error("Profil non trouvé");
      }
      return { success: true, data: profile };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Met à jour un utilisateur
   * @param id - ID de l'utilisateur
   * @param data - Données de mise à jour
   */
  async updateUser(id: string, data: any) {
    try {
      const user = await this.userService.updateUser(id, data);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      return { success: true, data: user };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Supprime un utilisateur
   * @param id - ID de l'utilisateur
   */
  async deleteUser(id: string) {
    try {
      const success = await this.userService.deleteUser(id);
      if (!success) {
        throw new Error("Utilisateur non trouvé");
      }
      return { success: true, message: "Utilisateur supprimé avec succès" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Récupère la liste des utilisateurs avec filtres et pagination
   * @param filters - Filtres de recherche
   * @param pagination - Paramètres de pagination
   */
  async getUsers(filters: UserFilters, pagination: PaginationParams) {
    try {
      const users = await this.userService.getUsers(filters, pagination);
      return { success: true, data: users };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Vérifie un utilisateur
   * @param id - ID de l'utilisateur
   */
  async verifyUser(id: string) {
    try {
      const success = await this.userService.verifyUser(id);
      if (!success) {
        throw new Error("Utilisateur non trouvé");
      }
      return { success: true, message: "Utilisateur vérifié avec succès" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
