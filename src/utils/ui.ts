import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine et fusionne les classes CSS avec Tailwind
 * @param inputs - Les classes CSS à combiner
 * @returns Les classes CSS fusionnées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
