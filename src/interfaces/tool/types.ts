import type { Review } from "../review/types";

export interface Tool {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  pricePerDay: number;
  deposit: number;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  ownerId: string;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    createdAt: string;
  };
  images: string[];
  location: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  specifications: {
    brand?: string;
    model?: string;
    year?: number;
    condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ToolFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  city?: string;
  country?: string;
  ownerId?: string;
}

export type ToolCategory =
  | "LAPTOP"
  | "DESKTOP"
  | "TABLET"
  | "SMARTPHONE"
  | "CAMERA"
  | "PRINTER"
  | "NETWORK"
  | "OTHER";
