import { Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  author: string;
  post: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
