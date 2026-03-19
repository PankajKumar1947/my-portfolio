export interface ITodo {
  _id: string;
  title: string;
  description?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
  priority: "low" | "medium" | "high";
  status?: "planned_today" | "completed" | "tomorrow_plan";
  createdAt: string;
  updatedAt: string;
}

export type CreateTodoDTO = Omit<ITodo, "_id" | "createdAt" | "updatedAt">;
export type UpdateTodoDTO = Partial<CreateTodoDTO>;
