"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createToolSchema, type CreateToolInput } from "@/lib/validations/tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/ui/image-upload";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";

export function ToolForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateToolInput>({
    resolver: zodResolver(createToolSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      pricePerDay: 0,
      deposit: 0,
      category: "OTHER",
      images: [],
      location: {
        city: "",
        country: "Côte d'Ivoire",
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
      specifications: {
        brand: "",
        model: "",
        condition: "GOOD",
      },
    },
  });

  // Synchroniser les images avec le formulaire
  useEffect(() => {
    console.log("Images updated:", images);
    setValue("images", images);
  }, [images, setValue]);

  // Synchroniser pricePerDay avec price
  useEffect(() => {
    const price = watch("price");
    setValue("pricePerDay", price);
  }, [watch("price"), setValue]);

  const handleImageChange = (url: string) => {
    console.log("Adding image:", url);
    setImages((prev) => [...prev, url]);
  };

  const handleImageRemove = (url: string) => {
    console.log("Removing image:", url);
    setImages((prev) => prev.filter((current) => current !== url));
  };

  const onSubmit = async (data: CreateToolInput) => {
    if (!session) {
      toast.error("Vous devez être connecté pour créer un outil");
      router.push("/auth/signin");
      return;
    }

    if (images.length === 0) {
      toast.error("Au moins une image est requise");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post("/api/tools", {
        ...data,
        images,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          response.data?.message || "Erreur lors de la création de l'outil"
        );
      }

      toast.success("Outil créé avec succès");
      router.push("/tools");
      router.refresh();
    } catch (error: any) {
      console.error("Erreur:", error);
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom de l'outil
          </label>
          <Input id="name" {...register("name")} className="mt-1" />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            {...register("description")}
            className="mt-1"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Prix par jour (FCFA)
          </label>
          <Input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="deposit"
            className="block text-sm font-medium text-gray-700"
          >
            Caution (FCFA)
          </label>
          <Input
            id="deposit"
            type="number"
            {...register("deposit", { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.deposit && (
            <p className="mt-1 text-sm text-red-600">
              {errors.deposit.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Catégorie
          </label>
          <Select
            onValueChange={(value) =>
              setValue("category", value as CreateToolInput["category"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LAPTOP">Laptop</SelectItem>
              <SelectItem value="DESKTOP">Desktop</SelectItem>
              <SelectItem value="TABLET">Tablet</SelectItem>
              <SelectItem value="SMARTPHONE">Smartphone</SelectItem>
              <SelectItem value="CAMERA">Camera</SelectItem>
              <SelectItem value="PRINTER">Printer</SelectItem>
              <SelectItem value="NETWORK">Network</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700"
          >
            État
          </label>
          <Select
            onValueChange={(value) =>
              setValue(
                "specifications.condition",
                value as "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR"
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un état" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">Neuf</SelectItem>
              <SelectItem value="LIKE_NEW">Comme neuf</SelectItem>
              <SelectItem value="GOOD">Bon</SelectItem>
              <SelectItem value="FAIR">Moyen</SelectItem>
              <SelectItem value="POOR">Mauvais</SelectItem>
            </SelectContent>
          </Select>
          {errors.specifications?.condition && (
            <p className="mt-1 text-sm text-red-600">
              {errors.specifications.condition.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Marque
          </label>
          <Input
            id="brand"
            {...register("specifications.brand")}
            className="mt-1"
          />
          {errors.specifications?.brand && (
            <p className="mt-1 text-sm text-red-600">
              {errors.specifications.brand.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Modèle
          </label>
          <Input
            id="model"
            {...register("specifications.model")}
            className="mt-1"
          />
          {errors.specifications?.model && (
            <p className="mt-1 text-sm text-red-600">
              {errors.specifications.model.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Ville
          </label>
          <Input id="city" {...register("location.city")} className="mt-1" />
          {errors.location?.city && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.city.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Pays
          </label>
          <Input
            id="country"
            {...register("location.country")}
            className="mt-1"
          />
          {errors.location?.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.country.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-700"
          >
            Latitude
          </label>
          <Input
            id="latitude"
            type="number"
            min={0}
            step="any"
            {...register("location.coordinates.lat", { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.location?.coordinates?.lat && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.coordinates.lat.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-700"
          >
            Longitude
          </label>
          <Input
            id="longitude"
            type="number"
            min={0}
            step="any"
            {...register("location.coordinates.lng", { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.location?.coordinates?.lng && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.coordinates.lng.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <ImageUpload
            value={images}
            disabled={isSubmitting}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Création en cours..." : "Créer l'outil"}
      </Button>
    </form>
  );
}
