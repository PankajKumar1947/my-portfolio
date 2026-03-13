import * as todoRepo from "@/repositories/todo.repository";
import { CreateTodoDTO, UpdateTodoDTO, ITodo } from "@/types/todo.types";
import { todoSchema } from "@/validations/todos.schema";

export const createTodoService = async (data: CreateTodoDTO): Promise<ITodo> => {
  todoSchema.parse(data);
  return todoRepo.createTodo(data);
};

export const updateTodoService = async (
  id: string,
  data: UpdateTodoDTO
): Promise<ITodo | null> => {
  // If updating fields that need validation
  if (Object.keys(data).length > 0) {
    todoSchema.partial().parse(data);
  }
  return todoRepo.updateTodo(id, data);
};

export const deleteTodoService = async (id: string): Promise<ITodo | null> => {
  return todoRepo.deleteTodo(id);
};

export const getTodosByDateService = async (date: string): Promise<ITodo[]> => {
  return todoRepo.getTodosByDate(date);
};

export const getTodosByMonthService = async (month: string): Promise<ITodo[]> => {
  return todoRepo.getTodosByMonth(month);
};

export const getTodoByIdService = async (id: string): Promise<ITodo | null> => {
  return todoRepo.getTodoById(id);
};
