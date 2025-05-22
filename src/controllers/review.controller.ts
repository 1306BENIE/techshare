import { Request, Response } from "express";
import { ReviewService } from "@/services/review.service";
import { ReviewFilters } from "@/interfaces/review/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  /**
   * Crée un nouvel avis
   * @param req - Requête Express contenant les données de l'avis
   * @param res - Réponse Express
   */
  async createReview(req: Request, res: Response) {
    try {
      const review = await this.reviewService.createReview(req.body);
      res.status(201).json({ success: true, data: review });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Récupère un avis par son ID
   * @param req - Requête Express contenant l'ID de l'avis
   * @param res - Réponse Express
   */
  async getReviewById(req: Request, res: Response) {
    try {
      const review = await this.reviewService.getReviewById(req.params.id);
      if (!review) {
        return res
          .status(404)
          .json({ success: false, error: "Avis non trouvé" });
      }
      res.json({ success: true, data: review });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Met à jour un avis
   * @param req - Requête Express contenant l'ID et les données de mise à jour
   * @param res - Réponse Express
   */
  async updateReview(req: Request, res: Response) {
    try {
      const review = await this.reviewService.updateReview(
        req.params.id,
        req.body
      );
      if (!review) {
        return res
          .status(404)
          .json({ success: false, error: "Avis non trouvé" });
      }
      res.json({ success: true, data: review });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Supprime un avis
   * @param req - Requête Express contenant l'ID de l'avis
   * @param res - Réponse Express
   */
  async deleteReview(req: Request, res: Response) {
    try {
      const success = await this.reviewService.deleteReview(req.params.id);
      if (!success) {
        return res
          .status(404)
          .json({ success: false, error: "Avis non trouvé" });
      }
      res.json({ success: true, message: "Avis supprimé avec succès" });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Récupère la liste des avis avec filtres et pagination
   * @param req - Requête Express contenant les filtres et paramètres de pagination
   * @param res - Réponse Express
   */
  async getReviews(req: Request, res: Response) {
    try {
      const filters: ReviewFilters = req.query;
      const pagination: PaginationParams = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as "asc" | "desc",
      };
      const reviews = await this.reviewService.getReviews(filters, pagination);
      res.json({ success: true, data: reviews });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Récupère les avis d'un outil
   * @param req - Requête Express contenant l'ID de l'outil
   * @param res - Réponse Express
   */
  async getReviewsByTool(req: Request, res: Response) {
    try {
      const reviews = await this.reviewService.getReviewsByTool(
        req.params.toolId
      );
      res.json({ success: true, data: reviews });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Récupère les avis d'un utilisateur
   * @param req - Requête Express contenant l'ID de l'utilisateur
   * @param res - Réponse Express
   */
  async getReviewsByUser(req: Request, res: Response) {
    try {
      const reviews = await this.reviewService.getReviewsByUser(
        req.params.userId
      );
      res.json({ success: true, data: reviews });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  /**
   * Calcule la note moyenne d'une entité (outil ou utilisateur)
   * @param req - Requête Express contenant l'ID de l'entité et son type
   * @param res - Réponse Express
   */
  async calculateAverageRating(req: Request, res: Response) {
    try {
      const { type } = req.query;
      const rating = await this.reviewService.calculateAverageRating(
        req.params.id,
        type as "TOOL" | "USER"
      );
      res.json({ success: true, data: { rating } });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
