export const AUTH_ERRORS = {
  REQUIRED_FIELDS: "Tous les champs obligatoires doivent être remplis",
  EMAIL_IN_USE: "Cet email est déjà utilisé",
  INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
  INVALID_EMAIL: "Aucun compte n'est associé à cet email",
  INVALID_PASSWORD: "Le mot de passe est incorrect",
  PASSWORD_MISMATCH: "Les mots de passe ne correspondent pas",
  SERVER_ERROR: "Une erreur est survenue lors de l'authentification",
  UNAUTHORIZED: "Non autorisé",
  FORBIDDEN: "Accès refusé",
  INVALID_EMAIL_FORMAT: "Format d'email invalide",
  PASSWORD_TOO_SHORT: "Le mot de passe doit contenir au moins 8 caractères",
  PASSWORD_TOO_WEAK:
    "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
  INVALID_SECRET_KEY: "Clé secrète invalide",
  EMAIL_ALREADY_EXISTS: "Cet email est déjà utilisé",
} as const;
