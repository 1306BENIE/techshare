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
        console.log("Fetching tools...");
        const toolService = new ToolApiService();
        const response = await toolService.getTools();
        console.log("Tools response:", response);

        // On gère tous les cas possibles
        let toolsArray: Tool[] = [];
        if (response.data && Array.isArray((response.data as any).tools)) {
          toolsArray = (response.data as any).tools;
        } else if (Array.isArray(response.data)) {
          toolsArray = response.data;
        } else if (Array.isArray((response as any).tools)) {
          toolsArray = (response as any).tools;
        }

        console.log("Processed tools array:", toolsArray);
        setTools(toolsArray);
      } catch (err: any) {
        console.error("Error fetching tools:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Une erreur inattendue est survenue lors du chargement des outils"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return { tools, loading, error };
};
