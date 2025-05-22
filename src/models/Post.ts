import mongoose, { Schema } from "mongoose";
import { IPost } from "@/interfaces/post.interface";

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
    },
    content: {
      type: String,
      required: [true, "Le contenu est requis"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'auteur est requis"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
