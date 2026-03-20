import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  readTime: z.string().min(1, "Read time is required"),
  status: z.enum(["draft", "published", "inactive"]),
  content: z.string(),
  author: z.string().optional(),
});

export const updateBlogSchema = blogSchema.partial();

export type BlogFormValues = z.infer<typeof blogSchema>;
