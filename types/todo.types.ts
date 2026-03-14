export interface ITodo {
  _id: string;
  title: string;
  description?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
  priority: "low" | "medium" | "high";
  status?: "planned_today" | "ongoing" | "completed" | "tomorrow_plan";
  createdAt: string;
  updatedAt: string;
}

export interface IRemark {
  _id?: string;
  text: string;
  createdAt: string;
}

export interface IPlannerDay {
  _id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  remarks: IRemark[];
}

export type CreateTodoDTO = Omit<ITodo, "_id" | "createdAt" | "updatedAt">;
export type UpdateTodoDTO = Partial<CreateTodoDTO>;
export type UpsertPlannerDayDTO = {
  date: string;
  remark: string; // We'll send a single remark to append
};

export interface IDayData {
  todos: ITodo[];
  plannerDay: IPlannerDay;
}
