import { TodoModel } from "@/models/todo.model";
import { ITodo, CreateTodoDTO, UpdateTodoDTO } from "@/types/todo.types";

export const createTodo = async (data: CreateTodoDTO): Promise<ITodo> => {
  const todo = await TodoModel.create(data);
  return todo.toObject();
};

export const updateTodo = async (
  id: string,
  data: UpdateTodoDTO
): Promise<ITodo | null> => {
  const todo = await TodoModel.findByIdAndUpdate(id, data, { new: true }).lean();
  return todo as ITodo | null;
};

export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  const todo = await TodoModel.findByIdAndDelete(id).lean();
  return todo as ITodo | null;
};

export const getTodosByDate = async (date: string): Promise<ITodo[]> => {
  return await TodoModel.find({ date }).sort({ createdAt: 1 }).lean();
};

export const getTodosByMonth = async (month: string): Promise<ITodo[]> => {
  return await TodoModel.find({ date: { $regex: `^${month}` } })
    .sort({ date: 1, createdAt: 1 })
    .lean();
};

export const getTodoById = async (id: string): Promise<ITodo | null> => {
  const todo = await TodoModel.findById(id).lean();
  return todo as ITodo | null;
};
