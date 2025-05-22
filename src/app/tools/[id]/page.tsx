import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import toast from "react-hot-toast";
import { ReserveButton } from "@/components/tools/ReserveButton";

interface ToolPageProps {
  params: {
    id: string;
  };
}

async function getTool(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tools/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch tool");
  }

  return res.json();
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = await getTool(params.id);
  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === tool.ownerId._id;

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Colonne image */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden mb-4">
            <Image
              src={tool.images[0]}
              alt={tool.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {tool.images.length > 1 && (
            <div className="flex gap-2 flex-wrap justify-center">
              {tool.images.slice(1).map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${tool.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne infos */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
            <div className="flex gap-2 mb-4">
              <Badge>{tool.category}</Badge>
              {tool.specifications?.condition && (
                <Badge>{tool.specifications.condition}</Badge>
              )}
            </div>
            <p className="text-gray-600 mb-6">{tool.description}</p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Prix journalier</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(tool.pricePerDay)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Caution</span>
                <span className="font-bold">{formatPrice(tool.deposit)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-gray-500 text-sm">Marque</span>
                <div className="font-medium">{tool.specifications?.brand}</div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Modèle</span>
                <div className="font-medium">{tool.specifications?.model}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <ReserveButton toolId={tool._id} />
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
              {tool.owner?.firstName?.[0]}
            </div>
            <div>
              <div className="font-medium">
                {tool.owner?.firstName} {tool.owner?.lastName}
              </div>
              <div className="text-sm text-gray-500">{tool.owner?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
