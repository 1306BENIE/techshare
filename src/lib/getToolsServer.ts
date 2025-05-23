import connectDB from "@/lib/mongodb";
import Tool from "@/models/Tool";

export async function getToolsServer({
  search = "",
  category,
  condition,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
}: {
  search?: string;
  category?: string;
  condition?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}) {
  await connectDB();
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (category) query.category = category;
  if (condition) query["specifications.condition"] = condition;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;
  const [tools, total] = await Promise.all([
    Tool.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Tool.countDocuments(query),
  ]);

  return {
    tools: JSON.parse(JSON.stringify(tools)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
