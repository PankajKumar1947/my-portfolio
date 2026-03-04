import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
