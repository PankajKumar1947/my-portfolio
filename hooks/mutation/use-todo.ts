import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { todoQueries } from "@/react-query/todo";
import { CreateTodoDTO, UpdateTodoDTO, ITodo } from "@/types/todo.types";
import { toast } from "sonner";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: todoQueries.create.key,
    mutationFn: async (data: CreateTodoDTO) => {
      const response = await axiosInstance.post<ITodo>(todoQueries.create.endpoint, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all.key });
      toast.success("Todo created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create todo");
    },
  });
};

export const useUpdateTodo = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: todoQueries.update(id).key,
    mutationFn: async (data: UpdateTodoDTO) => {
      const response = await axiosInstance.patch<ITodo>(
        todoQueries.update(id).endpoint,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all.key });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update todo");
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(todoQueries.delete(id).endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all.key });
      toast.success("Todo deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to delete todo");
    },
  });
};
