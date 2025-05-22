import type { Review } from "../review/types";
import type { Tool } from "../tool/types";
import type { Booking } from "../booking/types";
import { Document, Model } from "mongoose";

// Interface pour les méthodes d'instance
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface pour le document User
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  password: string;
  role: "user" | "admin";
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour le modèle User
export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  // Méthodes statiques du modèle si nécessaire
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: "USER" | "ADMIN";
  isVerified: boolean;
  password?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  search?: string;
  role?: "USER" | "ADMIN";
  isVerified?: boolean;
  city?: string;
  country?: string;
}

export interface UserProfile extends User {
  stats: {
    totalBookings: number;
    totalReviews: number;
    averageRating: number;
  };
}
