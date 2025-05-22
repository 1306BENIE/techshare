import {
  Booking,
  BookingFilters,
  BookingStatus,
  PaymentStatus,
  BookingCreateInput,
  BookingUpdateInput,
  BookingResponse,
} from "../interfaces/booking";
import { PaginatedResponse, PaginationParams } from "../interfaces/common";
import BookingModel from "../models/Booking";
import connectDB from "@/lib/mongodb";
import { HydratedDocument } from "mongoose";

export class BookingService {
  async createBooking(
    bookingData: BookingCreateInput
  ): Promise<BookingResponse> {
    await connectDB();

    // Vérifier si l'outil est disponible pour la période demandée
    const isAvailable = await this.checkToolAvailability(
      bookingData.toolId,
      new Date(bookingData.startDate),
      new Date(bookingData.endDate)
    );

    if (!isAvailable) {
      throw new Error("L'outil n'est pas disponible pour cette période");
    }

    const booking = await BookingModel.create({
      ...bookingData,
      status: "PENDING" as BookingStatus,
      paymentStatus: "PENDING" as PaymentStatus,
    });

    return this.mapToBookingResponse(booking);
  }

  async getBookingById(id: string): Promise<BookingResponse | null> {
    await connectDB();
    const booking = await BookingModel.findById(id)
      .populate("toolId")
      .populate("userId");
    return booking ? this.mapToBookingResponse(booking) : null;
  }

  async updateBooking(
    id: string,
    bookingData: BookingUpdateInput
  ): Promise<BookingResponse | null> {
    await connectDB();
    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { $set: bookingData },
      { new: true }
    )
      .populate("toolId")
      .populate("userId");

    return booking ? this.mapToBookingResponse(booking) : null;
  }

  async deleteBooking(id: string): Promise<boolean> {
    await connectDB();
    const result = await BookingModel.findByIdAndDelete(id);
    return !!result;
  }

  async getBookings(
    filters: BookingFilters,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<BookingResponse>> {
    await connectDB();
    let query = BookingModel.find();

    // Appliquer les filtres
    if (filters) {
      const filterQuery: any = {};

      if (filters.userId) {
        filterQuery.userId = filters.userId;
      }
      if (filters.toolId) {
        filterQuery.toolId = filters.toolId;
      }
      if (filters.status) {
        filterQuery.status = filters.status;
      }
      if (filters.paymentStatus) {
        filterQuery.paymentStatus = filters.paymentStatus;
      }
      if (filters.startDate || filters.endDate) {
        filterQuery.startDate = {};
        if (filters.startDate) {
          filterQuery.startDate.$gte = new Date(filters.startDate);
        }
        if (filters.endDate) {
          filterQuery.startDate.$lte = new Date(filters.endDate);
        }
      }

      query = query.find(filterQuery);
    }

    // Appliquer la pagination
    const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    if (sortBy) {
      const sort: any = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
      query = query.sort(sort);
    }

    const [bookings, total] = await Promise.all([
      query
        .skip(skip)
        .limit(limit)
        .populate("toolId")
        .populate("userId")
        .exec(),
      BookingModel.countDocuments(query.getQuery()),
    ]);

    return {
      items: bookings.map(this.mapToBookingResponse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getBookingsByUser(userId: string): Promise<BookingResponse[]> {
    await connectDB();
    const bookings = await BookingModel.find({ userId })
      .populate("toolId")
      .populate("userId");
    return bookings.map(this.mapToBookingResponse);
  }

  async updateBookingStatus(
    id: string,
    status: BookingStatus
  ): Promise<BookingResponse | null> {
    return this.updateBooking(id, { status });
  }

  async updatePaymentStatus(
    id: string,
    status: PaymentStatus
  ): Promise<BookingResponse | null> {
    return this.updateBooking(id, { paymentStatus: status });
  }

  async calculateBookingPrice(
    toolId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ totalPrice: number; deposit: number }> {
    await connectDB();
    const tool = await BookingModel.findById(toolId);

    if (!tool) {
      throw new Error("Outil non trouvé");
    }

    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const totalPrice = days * tool.totalPrice;
    const deposit = totalPrice * 0.2; // 20% de dépôt de garantie

    return { totalPrice, deposit };
  }

  private async checkToolAvailability(
    toolId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    await connectDB();

    // Vérifier s'il existe des réservations qui se chevauchent
    const overlappingBooking = await BookingModel.findOne({
      toolId,
      status: { $in: ["PENDING", "CONFIRMED"] as BookingStatus[] },
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    return !overlappingBooking;
  }

  private mapToBookingResponse(
    booking: HydratedDocument<Booking>
  ): BookingResponse {
    return {
      id: booking._id.toString(),
      toolId: booking.toolId.toString(),
      userId: booking.userId.toString(),
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      totalPrice: booking.totalPrice,
      deposit: booking.deposit,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }
}
