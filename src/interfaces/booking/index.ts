import { Document, Types } from "mongoose";

export * from "./types";
export * from "./filters";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED";

export interface Booking extends Document {
  toolId: Types.ObjectId;
  userId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  deposit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingResponse {
  id: string;
  toolId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  deposit: number;
  createdAt: Date;
  updatedAt: Date;
  tool?: {
    name: string;
    images: string[];
    price: number;
    deposit: number;
  };
  renter?: {
    name?: string;
    email?: string;
  };
}

export interface BookingFilters {
  userId?: string;
  toolId?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface BookingCreateInput {
  toolId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  deposit: number;
}

export interface BookingUpdateInput {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  totalPrice?: number;
  deposit?: number;
}
