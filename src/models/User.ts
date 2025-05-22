import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, IUserModel, IUserMethods } from "@/interfaces/user/types";

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Format d'email invalide",
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: [true, "L'adresse est requise"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "La ville est requise"],
        trim: true,
      },
      postalCode: {
        type: String,
        required: [true, "Le code postal est requis"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Le pays est requis"],
        trim: true,
      },
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
      select: false, // Ne pas inclure le mot de passe dans les requêtes par défaut
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware pour hasher le mot de passe avant la sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Utiliser un nombre de rounds fixe pour la cohérence
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Mot de passe hashé avec succès");
    next();
  } catch (error: any) {
    console.error("Erreur lors du hachage du mot de passe:", error);
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    // Vérifier si le mot de passe est disponible
    if (!this.password) {
      console.error("Le mot de passe n'est pas disponible pour la comparaison");
      return false;
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log("Comparaison des mots de passe:", {
      isMatch,
      hashedPassword: this.password,
    });
    return isMatch;
  } catch (error) {
    console.error("Erreur lors de la comparaison des mots de passe:", error);
    return false;
  }
};

// Créer et exporter le modèle
const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
export type { IUser, IUserModel, IUserMethods } from "@/interfaces/user/types";
