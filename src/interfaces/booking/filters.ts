import { BookingStatus, PaymentStatus } from "./types";

export interface BookingFilters {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  toolId?: string;
  userId?: string;
  minPrice?: number;
  maxPrice?: number;
}
