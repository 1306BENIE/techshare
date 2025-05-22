import { notFound } from "next/navigation";
import { ToolForm } from "@/components/tools/ToolForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface EditToolPageProps {
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

export default async function EditToolPage({ params }: EditToolPageProps) {
  const tool = await getTool(params.id);
  const session = await getServerSession(authOptions);

  // Vérifier que l'utilisateur est le propriétaire
  if (session?.user?.id !== tool.ownerId._id) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href={`/tools/${tool._id}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux détails
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Modifier l'outil</h1>
          <p className="text-gray-500 mt-2">
            Modifiez les informations de votre outil ci-dessous.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ToolForm
            initialData={tool}
            onSubmit={async (data) => {
              "use server";

              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/tools/${tool._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              );

              if (!res.ok) {
                throw new Error("Failed to update tool");
              }

              // Rediriger vers la page de détails
              window.location.href = `/tools/${tool._id}`;
            }}
          />
        </div>
      </div>
    </div>
  );
}
