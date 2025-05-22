import { ReactNode } from "react";

export interface Feature {
  name: string;
  description: string;
  icon: ReactNode;
}

export interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    location: {
      city: string;
      country: string;
    };
    status: string;
  };
}
