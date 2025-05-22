import { NextRequest } from "next/server";
import { BookingService } from "@/services/booking.service";
import {
  BookingCreateInput,
  BookingUpdateInput,
  BookingStatus,
  PaymentStatus,
  BookingResponse,
} from "@/interfaces/booking";
import { PaginationParams } from "@/interfaces/common";

export class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  /**
   * Crée une nouvelle réservation
   * @param req - Requête Next contenant les données de la réservation
   * @returns - Réponse Next
   */
  async createBooking(
    req: NextRequest
  ): Promise<{ success: boolean; data?: BookingResponse; error?: string }> {
    try {
      const bookingData: BookingCreateInput = await req.json();
      const booking = await this.bookingService.createBooking(bookingData);
      return { success: true, data: booking };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Récupère une réservation par son ID
   * @param id - ID de la réservation
   * @returns - Réponse Next
   */
  async getBookingById(
    id: string
  ): Promise<{ success: boolean; data?: BookingResponse; error?: string }> {
    try {
      const booking = await this.bookingService.getBookingById(id);
      if (!booking) {
        return { success: false, error: "Réservation non trouvée" };
      }
      return { success: true, data: booking };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Met à jour une réservation
   * @param id - ID de la réservation
   * @param req - Requête Next contenant les données de mise à jour
   * @returns - Réponse Next
   */
  async updateBooking(
    id: string,
    req: NextRequest
  ): Promise<{ success: boolean; data?: BookingResponse; error?: string }> {
    try {
      const bookingData: BookingUpdateInput = await req.json();
      const booking = await this.bookingService.updateBooking(id, bookingData);
      if (!booking) {
        return { success: false, error: "Réservation non trouvée" };
      }
      return { success: true, data: booking };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Supprime une réservation
   * @param id - ID de la réservation
   * @returns - Réponse Next
   */
  async deleteBooking(
    id: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const success = await this.bookingService.deleteBooking(id);
      if (!success) {
        return { success: false, error: "Réservation non trouvée" };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Récupère la liste des réservations avec filtres et pagination
   * @param req - Requête Next contenant les filtres et paramètres de pagination
   * @returns - Réponse Next
   */
  async getBookings(req: NextRequest): Promise<{
    success: boolean;
    data?: {
      items: BookingResponse[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    error?: string;
  }> {
    try {
      const searchParams = req.nextUrl.searchParams;
      const filters = {
        userId: searchParams.get("userId") || undefined,
        toolId: searchParams.get("toolId") || undefined,
        status: searchParams.get("status") as BookingStatus | undefined,
        paymentStatus: searchParams.get("paymentStatus") as
          | PaymentStatus
          | undefined,
        startDate: searchParams.get("startDate")
          ? new Date(searchParams.get("startDate")!)
          : undefined,
        endDate: searchParams.get("endDate")
          ? new Date(searchParams.get("endDate")!)
          : undefined,
      };

      const pagination: PaginationParams = {
        page: parseInt(searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "10"),
        sortBy: searchParams.get("sortBy") || undefined,
        sortOrder: searchParams.get("sortOrder") as "asc" | "desc" | undefined,
      };

      const result = await this.bookingService.getBookings(filters, pagination);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Récupère les réservations d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @returns - Réponse Next
   */
  async getBookingsByUser(
    userId: string
  ): Promise<{ success: boolean; data?: BookingResponse[]; error?: string }> {
    try {
      const bookings = await this.bookingService.getBookingsByUser(userId);
      return { success: true, data: bookings };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Met à jour le statut d'une réservation
   * @param id - ID de la réservation
   * @param status - Nouveau statut de la réservation
   * @returns - Réponse Next
   */
  async updateBookingStatus(
    id: string,
    status: BookingStatus
  ): Promise<{ success: boolean; data?: BookingResponse; error?: string }> {
    try {
      const booking = await this.bookingService.updateBookingStatus(id, status);
      if (!booking) {
        return { success: false, error: "Réservation non trouvée" };
      }
      return { success: true, data: booking };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Met à jour le statut du paiement d'une réservation
   * @param id - ID de la réservation
   * @param status - Nouveau statut de paiement
   * @returns - Réponse Next
   */
  async updatePaymentStatus(
    id: string,
    status: PaymentStatus
  ): Promise<{ success: boolean; data?: BookingResponse; error?: string }> {
    try {
      const booking = await this.bookingService.updatePaymentStatus(id, status);
      if (!booking) {
        return { success: false, error: "Réservation non trouvée" };
      }
      return { success: true, data: booking };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Calcule le prix d'une réservation
   * @param id - ID de l'outil
   * @param req - Requête Next contenant les dates
   * @returns - Réponse Next
   */
  async calculateBookingPrice(
    id: string,
    req: NextRequest
  ): Promise<{
    success: boolean;
    data?: { totalPrice: number; deposit: number };
    error?: string;
  }> {
    try {
      const { startDate, endDate } = await req.json();
      const booking = await this.bookingService.getBookingById(id);

      if (!booking) {
        return { success: false, error: "Réservation non trouvée" };
      }

      const price = await this.bookingService.calculateBookingPrice(
        booking.toolId,
        new Date(startDate),
        new Date(endDate)
      );

      return { success: true, data: price };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
