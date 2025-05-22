import { useState, useEffect } from "react";
import { Tool } from "@/interfaces/tool/types";
import { ToolApiService } from "@/services/tool.api";

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await new ToolApiService().getTools();
        // On gère tous les cas possibles
        let toolsArray: Tool[] = [];
        if (response.data && Array.isArray((response.data as any).tools)) {
          toolsArray = (response.data as any).tools;
        } else if (Array.isArray(response.data)) {
          toolsArray = response.data;
        } else if (Array.isArray((response as any).tools)) {
          toolsArray = (response as any).tools;
        }
        setTools(toolsArray);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Une erreur inattendue est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return { tools, loading, error };
};
