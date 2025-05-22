import mongoose from "mongoose";

// Interface définissant la structure du cache MongoDB
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Déclaration globale pour le cache mongoose
declare global {
  var mongoose: MongooseCache | undefined;
}

// Vérification de la présence de l'URI MongoDB dans les variables d'environnement
if (!process.env.MONGODB_URI) {
  throw new Error(
    "Veuillez définir la variable d'environnement MONGODB_URI dans le fichier .env.local"
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialisation du cache avec une valeur par défaut si non définie
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Initialisation du cache global si non défini
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Fonction de connexion à la base de données MongoDB
 * Utilise un système de cache pour éviter les connexions multiples
 * @returns {Promise<typeof mongoose>} Instance de connexion mongoose
 */
async function connectDB() {
  // Si une connexion existe déjà, la retourner
  if (cached.conn) {
    return cached.conn;
  }

  // Si aucune promesse de connexion n'existe, en créer une nouvelle
  if (!cached.promise) {
    // Options de connexion pour MongoDB
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 30000,
    };

    try {
      // Tentative de connexion à MongoDB
      cached.promise = mongoose.connect(MONGODB_URI, opts);
      console.log("Tentative de connexion à MongoDB...");
    } catch (error) {
      console.error("Erreur de connexion à MongoDB:", error);
      throw error;
    }
  }

  try {
    // Attente de la résolution de la promesse de connexion
    cached.conn = await cached.promise;
    console.log("Connexion à MongoDB établie avec succès");
  } catch (e) {
    // En cas d'erreur, réinitialisation de la promesse
    cached.promise = null;
    console.error("Erreur de connexion à MongoDB:", e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
