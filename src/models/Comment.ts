import mongoose, { Schema } from "mongoose";
import { IComment } from "@/interfaces/comment.interface";

const CommentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Le contenu est requis"],
      trim: true,
      maxlength: [500, "Le commentaire ne peut pas dépasser 500 caractères"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'auteur est requis"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "La publication est requise"],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);
