"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function ReserveButton({ toolId }: { toolId: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Button
      className="px-8 py-3 text-base rounded-lg"
      size="lg"
      onClick={() => {
        if (!session) {
          toast.error("Vous devez être connecté pour réserver.");
          router.push(`/auth/signin?callbackUrl=/tools/${toolId}`);
          return;
        }
        router.push(`/bookings/new?toolId=${toolId}`);
      }}
    >
      Réserver cet outil
    </Button>
  );
}
