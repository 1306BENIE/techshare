import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createToolSchema, searchToolSchema } from "@/lib/validations/tool";
import connectDB from "@/lib/mongodb";
import Tool from "@/models/Tool";

// GET /api/tools - Liste des outils avec filtres
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    // Construire la requête de filtrage
    const query: any = {};

    // Filtre par recherche
    const search = searchParams.get("search");
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filtre par catégorie
    const category = searchParams.get("category");
    if (category) {
      query.category = category;
    }

    // Filtre par état
    const condition = searchParams.get("condition");
    if (condition) {
      query["specifications.condition"] = condition;
    }

    // Filtre par prix
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Exécuter la requête avec pagination
    const [tools, total] = await Promise.all([
      Tool.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Tool.countDocuments(query),
    ]);

    return NextResponse.json({
      tools,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des outils:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des outils" },
      { status: 500 }
    );
  }
}

// POST /api/tools - Création d'un outil
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createToolSchema.parse(body);

    await connectDB();

    const [firstName = "", lastName = ""] = (session.user.name || "").split(
      " "
    );

    const tool = await Tool.create({
      ...validatedData,
      ownerId: session.user.id,
      owner: {
        _id: session.user.id,
        firstName,
        lastName,
        email: session.user.email,
        createdAt: new Date().toISOString(),
      },
      status: "AVAILABLE",
    });

    return NextResponse.json(tool, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/tools:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'outil" },
      { status: 500 }
    );
  }
}
