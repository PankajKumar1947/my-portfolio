import { z } from "zod";

export const plannerDaySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  remark: z.string().min(1, "Remark cannot be empty").max(1000, "Remark too long"),
});

export type PlannerDayFormValues = z.infer<typeof plannerDaySchema>;
