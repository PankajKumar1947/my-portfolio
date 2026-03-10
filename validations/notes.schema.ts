import { z } from "zod";

export const notePageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Page title is required"),
  content: z.string(),
  order: z.number(),
});

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["draft", "published"]),
  pages: z.array(notePageSchema),
});

export const updateNoteSchema = noteSchema.partial();

export type NoteFormValues = z.infer<typeof noteSchema>;
export type NotePageValues = z.infer<typeof notePageSchema>;
