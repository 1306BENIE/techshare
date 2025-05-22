import mongoose, { Schema } from "mongoose";
import { Booking, BookingStatus, PaymentStatus } from "@/interfaces/booking";

const BookingSchema = new Schema<Booking>(
  {
    toolId: {
      type: Schema.Types.ObjectId,
      ref: "Tool",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED",
      ] as BookingStatus[],
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "REFUNDED"] as PaymentStatus[],
      default: "PENDING",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model<Booking>("Booking", BookingSchema);
