"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { createToolSchema, type CreateToolInput } from "@/lib/validations/tool";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData: CreateToolInput = {
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
    coordinates: { lat: 0, lng: 0 },
  },
  specifications: {
    brand: "",
    model: "",
    condition: "GOOD",
  },
};

// Type pour les erreurs du formulaire multi-étapes
export type MultiStepToolFormErrors = Partial<{
  name: string;
  description: string;
  category: string;
  images: string;
  "specifications.brand": string;
  "specifications.model": string;
  "specifications.condition": string;
  price: string;
  deposit: string;
  "location.city": string;
  "location.country": string;
}>;

interface StepProps {
  data: CreateToolInput;
  errors: MultiStepToolFormErrors;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => void;
}

export function ToolFormStep1({ data, errors, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom de l'outil
        </label>
        <Input
          name="name"
          value={data.name}
          onChange={onChange}
          className="mt-1"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          name="description"
          value={data.description}
          onChange={onChange}
          className="mt-1"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <Select
          name="category"
          value={data.category}
          onValueChange={(v) =>
            onChange({ target: { name: "category", value: v } })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue
              className="text-black"
              placeholder="Choisir une catégorie"
            />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-none shadow-none rounded-md">
            <SelectItem value="LAPTOP">Ordinateur Portable</SelectItem>
            <SelectItem value="DESKTOP">Ordinateur de Bureau</SelectItem>
            <SelectItem value="PRINTER">Imprimante</SelectItem>
            <SelectItem value="CAMERA">Caméra</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>
    </div>
  );
}

export function ToolFormStep2({ data, errors, onChange }: StepProps) {
  // Gestion des images pour ImageUpload
  const handleImageAdd = (url: string) => {
    onChange({ target: { name: "images", value: [...data.images, url] } });
  };
  const handleImageRemove = (url: string) => {
    onChange({
      target: {
        name: "images",
        value: data.images.filter((img: string) => img !== url),
      },
    });
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <ImageUpload
          value={data.images}
          onChange={handleImageAdd}
          onRemove={handleImageRemove}
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marque
          </label>
          <Input
            name="specifications.brand"
            value={data.specifications.brand}
            onChange={onChange}
            className="mt-1"
          />
          {errors["specifications.brand"] && (
            <p className="mt-1 text-sm text-red-600">
              {errors["specifications.brand"]}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modèle
          </label>
          <Input
            name="specifications.model"
            value={data.specifications.model}
            onChange={onChange}
            className="mt-1"
          />
          {errors["specifications.model"] && (
            <p className="mt-1 text-sm text-red-600">
              {errors["specifications.model"]}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">État</label>
        <Select
          name="specifications.condition"
          value={data.specifications.condition}
          onValueChange={(v) =>
            onChange({ target: { name: "specifications.condition", value: v } })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Choisir l'état" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-none shadow-none rounded-md">
            <SelectItem value="NEW">Neuf</SelectItem>
            <SelectItem value="GOOD">Bon</SelectItem>
            <SelectItem value="USED">Usagé</SelectItem>
          </SelectContent>
        </Select>
        {errors["specifications.condition"] && (
          <p className="mt-1 text-sm text-red-600">
            {errors["specifications.condition"]}
          </p>
        )}
      </div>
    </div>
  );
}

export function ToolFormStep3({ data, errors, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prix par jour (FCFA)
        </label>
        <Input
          name="price"
          type="number"
          value={data.price}
          onChange={onChange}
          className="mt-1"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Caution (FCFA)
        </label>
        <Input
          name="deposit"
          type="number"
          value={data.deposit}
          onChange={onChange}
          className="mt-1"
        />
        {errors.deposit && (
          <p className="mt-1 text-sm text-red-600">{errors.deposit}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ville
          </label>
          <Input
            name="location.city"
            value={data.location.city}
            onChange={onChange}
            className="mt-1"
          />
          {errors["location.city"] && (
            <p className="mt-1 text-sm text-red-600">
              {errors["location.city"]}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pays
          </label>
          <Input
            name="location.country"
            value={data.location.country}
            onChange={onChange}
            className="mt-1"
          />
          {errors["location.country"] && (
            <p className="mt-1 text-sm text-red-600">
              {errors["location.country"]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function useMultiStepToolForm() {
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3;
  const [formData, setFormData] = useState<CreateToolInput>(defaultData);
  const [errors, setErrors] = useState<MultiStepToolFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  const validateStep = async (
    data: CreateToolInput,
    currentStep: number
  ): Promise<MultiStepToolFormErrors> => {
    try {
      let partialSchema;
      if (currentStep === 0) {
        partialSchema = createToolSchema.pick({
          name: true,
          description: true,
          category: true,
        });
      } else if (currentStep === 1) {
        partialSchema = createToolSchema.pick({
          images: true,
          specifications: true,
        });
      } else {
        partialSchema = createToolSchema.pick({
          price: true,
          deposit: true,
          location: true,
        });
      }
      await partialSchema.parseAsync(data);
      return {};
    } catch (err: any) {
      return (err.formErrors?.fieldErrors || {}) as MultiStepToolFormErrors;
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    if (name === "price" || name === "deposit") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => {
        if (parent === "location" && typeof prev.location === "object") {
          return {
            ...prev,
            location: {
              ...prev.location,
              [child]: value,
            },
          };
        }
        if (
          parent === "specifications" &&
          typeof prev.specifications === "object"
        ) {
          return {
            ...prev,
            specifications: {
              ...prev.specifications,
              [child]: value,
            },
          };
        }

        // fallback (ne devrait pas arriver)
        return prev;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = async () => {
    const stepErrors = await validateStep(formData, step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = await validateStep(formData, step);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    setIsSubmitting(true);
    try {
      await axios.post("/api/tools", formData);
      setIsSuccess(true);
      setTimeout(() => router.push("/tools"), 2000);
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la création de l'outil");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    totalSteps,
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    isSuccess,
  };
}
