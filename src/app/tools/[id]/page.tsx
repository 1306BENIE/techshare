import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToolDetailsAnimated } from "@/components/tools/ToolDetailsAnimated";

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
  // const isOwner = session?.user?.id === tool.ownerId._id; // Si besoin

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <ToolDetailsAnimated tool={tool} />
      </div>
    </div>
  );
}
