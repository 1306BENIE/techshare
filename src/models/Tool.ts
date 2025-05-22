import mongoose, { Schema, Document } from "mongoose";
import { Tool } from "@/interfaces/tool/types";

export interface ITool extends Omit<Tool, "_id">, Document {}

const ToolSchema = new Schema<ITool>(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
    },
    price: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: [0, "Le prix ne peut pas être négatif"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Le prix par jour est requis"],
      min: [0, "Le prix par jour ne peut pas être négatif"],
    },
    deposit: {
      type: Number,
      required: [true, "La caution est requise"],
      min: [0, "La caution ne peut pas être négative"],
    },
    images: [
      {
        type: String,
        required: [true, "Au moins une image est requise"],
      },
    ],
    location: {
      city: {
        type: String,
        required: [true, "La ville est requise"],
      },
      country: {
        type: String,
        required: [true, "Le pays est requis"],
      },
      coordinates: {
        lat: {
          type: Number,
          required: [true, "La latitude est requise"],
        },
        lng: {
          type: Number,
          required: [true, "La longitude est requise"],
        },
      },
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "RENTED", "MAINTENANCE"],
      default: "AVAILABLE",
    },
    ownerId: {
      type: String,
      required: [true, "L'ID du propriétaire est requis"],
    },
    owner: {
      _id: {
        type: String,
        required: [true, "L'ID du propriétaire est requis"],
      },
      firstName: {
        type: String,
        required: [true, "Le prénom du propriétaire est requis"],
      },
      lastName: {
        type: String,
        required: [true, "Le nom du propriétaire est requis"],
      },
      email: {
        type: String,
        required: [true, "L'email du propriétaire est requis"],
      },
      avatar: {
        type: String,
      },
      createdAt: {
        type: String,
        required: [true, "La date de création du propriétaire est requise"],
      },
    },
    category: {
      type: String,
      required: [true, "La catégorie est requise"],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Créer l'index pour la recherche
ToolSchema.index({ name: "text", description: "text" });

// Créer l'index pour la géolocalisation
ToolSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.models.Tool ||
  mongoose.model<ITool>("Tool", ToolSchema);
