import { ToolService } from "@/services/tool.service";
import { ToolFilters } from "@/interfaces/tool";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { NextRequest } from "next/server";

export class ToolController {
  private toolService: ToolService;

  constructor() {
    this.toolService = new ToolService();
  }

  /**
   * Crée un nouvel outil
   * @param request - Requête Next contenant les données de l'outil
   * @returns - Réponse Next
   */
  async createTool(request: NextRequest) {
    try {
      const body = await request.json();
      const tool = await this.toolService.createTool(body);
      return { success: true, data: tool };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère un outil par son ID
   * @param id - ID de l'outil
   * @returns - Réponse Next
   */
  async getToolById(id: string) {
    try {
      const tool = await this.toolService.getToolById(id);
      if (!tool) {
        return { success: false, error: "Outil non trouvé" };
      }
      return { success: true, data: tool };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Met à jour un outil
   * @param id - ID de l'outil
   * @param request - Requête Next contenant les données de mise à jour
   * @returns - Réponse Next
   */
  async updateTool(id: string, request: NextRequest) {
    try {
      const body = await request.json();
      const tool = await this.toolService.updateTool(id, body);
      if (!tool) {
        return { success: false, error: "Outil non trouvé" };
      }
      return { success: true, data: tool };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Supprime un outil
   * @param id - ID de l'outil
   * @returns - Réponse Next
   */
  async deleteTool(id: string) {
    try {
      const success = await this.toolService.deleteTool(id);
      if (!success) {
        return { success: false, error: "Outil non trouvé" };
      }
      return { success: true, message: "Outil supprimé avec succès" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère la liste des outils avec filtres et pagination
   * @param request - Requête Next contenant les filtres et paramètres de pagination
   * @returns - Réponse Next
   */
  async getTools(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const filters: ToolFilters = {
        category: searchParams.get("category") || undefined,
        status: searchParams.get("status") || undefined,
        minPrice: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : undefined,
        maxPrice: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : undefined,
      };

      const pagination: PaginationParams = {
        page: Number(searchParams.get("page")) || 1,
        limit: Number(searchParams.get("limit")) || 10,
        sortBy: searchParams.get("sortBy") || undefined,
        sortOrder:
          (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
      };

      const tools = await this.toolService.getTools(filters, pagination);
      return { success: true, data: tools };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère les outils d'un propriétaire
   * @param ownerId - ID du propriétaire
   * @returns - Réponse Next
   */
  async getToolsByOwner(ownerId: string) {
    try {
      const tools = await this.toolService.getToolsByOwner(ownerId);
      return { success: true, data: tools };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Met à jour le statut d'un outil
   * @param id - ID de l'outil
   * @param request - Requête Next contenant le nouveau statut
   * @returns - Réponse Next
   */
  async updateToolStatus(id: string, request: NextRequest) {
    try {
      const { status } = await request.json();
      const tool = await this.toolService.updateToolStatus(id, status);
      if (!tool) {
        return { success: false, error: "Outil non trouvé" };
      }
      return { success: true, data: tool };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Vérifie la disponibilité d'un outil
   * @param id - ID de l'outil
   * @param request - Requête Next contenant les dates
   * @returns - Réponse Next
   */
  async checkToolAvailability(id: string, request: NextRequest) {
    try {
      const { startDate, endDate } = await request.json();
      const isAvailable = await this.toolService.checkToolAvailability(
        id,
        new Date(startDate),
        new Date(endDate)
      );
      return { success: true, data: { isAvailable } };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
