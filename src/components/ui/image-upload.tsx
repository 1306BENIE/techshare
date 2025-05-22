"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSuccess = (result: any) => {
    console.log("Upload result:", result);
    if (result.info && result.info.secure_url) {
      console.log("Image uploaded successfully:", result.info.secure_url);
      onChange(result.info.secure_url);
      toast.success("Image téléchargée avec succès");
    } else {
      console.error(
        "Erreur lors du téléchargement - Résultat invalide:",
        result
      );
      toast.error("Erreur lors du téléchargement de l'image");
    }
  };

  const onError = (error: any) => {
    console.error("Erreur Cloudinary détaillée:", {
      message: error.message,
      error: error,
      stack: error.stack,
    });
    toast.error("Erreur lors du téléchargement de l'image");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onSuccess}
        onError={onError}
        uploadPreset="techshare"
        options={{
          cloudName: "dqah2cmtq",
          sources: ["local"],
          multiple: false,
          maxFiles: 1,
          resourceType: "image",
          showAdvancedOptions: false,
          clientAllowedFormats: ["image/jpeg", "image/png", "image/webp"],
          maxFileSize: 5000000, // 5MB
        }}
      >
        {({ open }) => {
          const onClick = () => {
            console.log("Opening Cloudinary widget...");
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Ajouter une image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
