import { config } from "dotenv";
import { resolve } from "path";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Charger les variables d'environnement
config({ path: resolve(process.cwd(), ".env.local") });

async function createAdmin() {
  try {
    // Vérifier les variables d'environnement requises
    if (!process.env.ADMIN_SECRET_KEY) {
      throw new Error("ADMIN_SECRET_KEY n'est pas définie dans .env.local");
    }

    // Vérifier les arguments de la ligne de commande
    const args = process.argv.slice(2);
    if (args.length !== 4) {
      console.log(
        "Usage: npm run create-admin <firstName> <lastName> <email> <password>"
      );
      process.exit(1);
    }

    const [firstName, lastName, email, password] = args;

    // Vérifier si l'admin existe déjà
    await connectDB();
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Un admin avec cet email existe déjà");
      process.exit(1);
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'admin
    const admin = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      address: {
        street: "Admin Street",
        city: "Admin City",
        postalCode: "00000",
        country: "Admin Country",
      },
    });

    console.log("Admin créé avec succès :", {
      id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error);
    process.exit(1);
  }
}

createAdmin();
