import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  tags: z.string().optional(), // Comma-separated or space-separated tags
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  liveUrl: z.string().url("Invalid Live URL").or(z.literal("")).optional(),
  featured: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
