import { ITodo } from "./todo.types";

export interface IRemark {
  _id?: string;
  text: string;
  createdAt: string;
}

export interface IPlannerDay {
  _id?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  remarks: IRemark[];
}

export type UpsertPlannerDayDTO = {
  date: string;
  remark: string; // We'll send a single remark to append
};

export interface IDayData {
  todos: ITodo[];
  plannerDay: IPlannerDay;
}
