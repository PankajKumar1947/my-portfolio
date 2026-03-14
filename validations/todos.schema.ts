import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  completed: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["planned_today", "ongoing", "completed", "tomorrow_plan"]).optional(),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
