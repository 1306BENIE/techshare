import { ToolForm } from "@/components/tools/ToolForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateToolPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/tools">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Ajouter un outil</h1>
          <p className="text-gray-500 mt-2">
            Remplissez le formulaire ci-dessous pour ajouter un nouvel outil à
            partager.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ToolForm />
        </div>
      </div>
    </div>
  );
}
