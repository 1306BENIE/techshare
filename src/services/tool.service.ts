import { Tool } from "@/interfaces/tool/types";
import { ToolFilters } from "@/interfaces/tool";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import ToolModel from "@/models/Tool";
import connectDB from "@/lib/mongodb";

export class ToolService {
  async createTool(
    toolData: Omit<Tool, "id" | "createdAt" | "updatedAt">
  ): Promise<Tool> {
    await connectDB();
    const tool = await ToolModel.create(toolData);
    return this.mapToTool(tool);
  }

  async getToolById(id: string): Promise<Tool | null> {
    await connectDB();
    const tool = await ToolModel.findById(id);
    return tool ? this.mapToTool(tool) : null;
  }

  async updateTool(id: string, toolData: Partial<Tool>): Promise<Tool | null> {
    await connectDB();
    const tool = await ToolModel.findByIdAndUpdate(
      id,
      { $set: toolData },
      { new: true }
    );
    return tool ? this.mapToTool(tool) : null;
  }

  async deleteTool(id: string): Promise<boolean> {
    await connectDB();
    const result = await ToolModel.findByIdAndDelete(id);
    return !!result;
  }

  async getTools(
    filters?: ToolFilters,
    pagination?: PaginationParams
  ): Promise<Tool[]> {
    await connectDB();
    let query = ToolModel.find();

    // Appliquer les filtres
    if (filters) {
      const filterQuery: any = {};

      if (filters.category) {
        filterQuery.category = filters.category;
      }
      if (filters.status) {
        filterQuery.status = filters.status;
      }
      if (filters.minPrice || filters.maxPrice) {
        filterQuery.price = {};
        if (filters.minPrice) {
          filterQuery.price.$gte = filters.minPrice;
        }
        if (filters.maxPrice) {
          filterQuery.price.$lte = filters.maxPrice;
        }
      }

      query = query.find(filterQuery);
    }

    // Appliquer la pagination
    if (pagination) {
      const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
      const skip = (page - 1) * limit;

      if (sortBy) {
        const sort: any = {};
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;
        query = query.sort(sort);
      }

      query = query.skip(skip).limit(limit);
    }

    const tools = await query.exec();
    return tools.map(this.mapToTool);
  }

  async getToolsByOwner(ownerId: string): Promise<Tool[]> {
    await connectDB();
    const tools = await ToolModel.find({ ownerId });
    return tools.map(this.mapToTool);
  }

  async updateToolStatus(
    id: string,
    status: "AVAILABLE" | "RENTED" | "MAINTENANCE"
  ): Promise<Tool | null> {
    return this.updateTool(id, { status });
  }

  async checkToolAvailability(
    id: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    await connectDB();
    // TODO: Implémenter la logique de vérification de disponibilité
    // Pour l'instant, on considère que tous les outils sont disponibles
    return true;
  }

  private mapToTool(mongooseTool: any): Tool {
    return {
      _id: mongooseTool._id.toString(),
      name: mongooseTool.name,
      description: mongooseTool.description,
      category: mongooseTool.category,
      price: mongooseTool.price,
      pricePerDay: mongooseTool.pricePerDay,
      deposit: mongooseTool.deposit,
      status: mongooseTool.status,
      ownerId: mongooseTool.ownerId,
      owner: mongooseTool.owner,
      images: mongooseTool.images,
      location: mongooseTool.location,
      specifications: {
        ...Object.fromEntries(mongooseTool.specifications || new Map()),
        condition: mongooseTool.specifications?.condition || "GOOD",
      },
      createdAt: mongooseTool.createdAt,
      updatedAt: mongooseTool.updatedAt,
      __v: mongooseTool.__v,
    };
  }
}
