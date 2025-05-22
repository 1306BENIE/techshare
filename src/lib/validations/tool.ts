import { z } from "zod";
import { ToolCategory } from "@/interfaces/tool/types";

// Schéma pour les coordonnées
const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// Schéma pour la localisation
const locationSchema = z.object({
  city: z.string().min(2, "La ville est requise"),
  country: z.string().min(2, "Le pays est requis"),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
});

// Schéma pour les prix
const priceSchema = z.object({
  daily: z.number().min(0, "Le prix journalier doit être positif"),
  weekly: z
    .number()
    .min(0, "Le prix hebdomadaire doit être positif")
    .optional(),
  monthly: z.number().min(0, "Le prix mensuel doit être positif").optional(),
  deposit: z.number().min(0, "Le dépôt doit être positif").optional(),
});

// Schéma pour les images
const imageSchema = z.object({
  url: z.string().url("L'URL de l'image n'est pas valide"),
  isMain: z.boolean().default(false),
  order: z.number().min(0).default(0),
});

// Schéma pour la disponibilité
const availabilitySchema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
    isAvailable: z.boolean().default(true),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La date de fin doit être postérieure à la date de début",
  });

// Schéma pour les spécifications
const specificationsSchema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"]),
});

// Schéma principal pour la création d'un outil
export const createToolSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  price: z.number().min(0, "Le prix doit être positif"),
  pricePerDay: z.number().min(0, "Le prix par jour doit être positif"),
  deposit: z.number().min(0, "La caution doit être positive"),
  category: z.enum([
    "LAPTOP",
    "DESKTOP",
    "TABLET",
    "SMARTPHONE",
    "CAMERA",
    "PRINTER",
    "NETWORK",
    "OTHER",
  ] as const),
  images: z.array(z.string()).min(1, "Au moins une image est requise"),
  location: locationSchema,
  specifications: specificationsSchema,
});

// Schéma pour la mise à jour d'un outil
export const updateToolSchema = createToolSchema.partial();

// Schéma pour la recherche d'outils
export const searchToolSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR"]).optional(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      radius: z.number().min(0).max(100), // rayon en km
    })
    .optional(),
  availability: z
    .object({
      startDate: z.date(),
      endDate: z.date(),
    })
    .optional(),
  sortBy: z.enum(["price", "rating", "distance", "date"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

// Types exportés
export type CreateToolInput = z.infer<typeof createToolSchema>;
export type UpdateToolInput = z.infer<typeof updateToolSchema>;
export type SearchToolInput = z.infer<typeof searchToolSchema>;
