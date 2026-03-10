import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  tags: z.string().optional(),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  liveUrl: z.string().url("Invalid Live URL").or(z.literal("")).optional(),
  featured: z.boolean(),
});

export const updateProjectSchema = projectSchema.partial();

export type ProjectFormValues = z.infer<typeof projectSchema>;
