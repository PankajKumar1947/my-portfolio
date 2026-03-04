import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  coverImage: z.string().optional(),
  readTime: z.string().min(1, "Read time is required"),
  status: z.string().min(1, "Status is required"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
