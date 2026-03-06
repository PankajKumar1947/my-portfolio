import { IBlog } from "@/types/blog.types";
import mongoose, { Model, Schema } from "mongoose";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "inactive"],
      default: "draft",
    },
    content: {
      type: String,
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
  },
  { timestamps: true }
);

export const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);