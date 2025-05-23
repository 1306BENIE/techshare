import { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
