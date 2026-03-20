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
      type: String,
      default: "Admin"
    },
  },
  { timestamps: true }
);

// Force delete the model to ensure schema changes are applied
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);