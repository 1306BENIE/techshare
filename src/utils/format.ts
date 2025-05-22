/**
 * Formate un prix en FCFA
 * @param price - Le prix à formater
 * @returns Le prix formaté (ex: "19 999 FCFA")
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Formate une date en format français
 * @param date - La date à formater
 * @returns La date formatée (ex: "1 janvier 2024")
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
};

/**
 * Formate un nombre avec des séparateurs de milliers
 * @param number - Le nombre à formater
 * @returns Le nombre formaté (ex: "1 234 567")
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("fr-FR").format(number);
};
