import type { Review } from "../review/types";

export interface Booking {
  id: string;
  toolId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  totalPrice: number;
  paymentStatus: "PENDING" | "PAID" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
}

export interface BookingFilters {
  userId?: string;
  toolId?: string;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  startDate?: Date;
  endDate?: Date;
  paymentStatus?: "PENDING" | "PAID" | "REFUNDED";
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";
