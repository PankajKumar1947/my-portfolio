import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { todoQueries } from "@/react-query/todo";
import { plannerDayQueries } from "@/react-query/planner-day";
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all.key });
      // Also invalidate planner-day data for the specific date
      queryClient.invalidateQueries({ 
        queryKey: plannerDayQueries.byDate(data.date).key 
      });
      toast.success("Todo created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create todo");
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateTodoDTO & { _id: string }) => {
      const { _id, ...updateData } = data;
      const response = await axiosInstance.patch<ITodo>(
        todoQueries.update(_id).endpoint,
        updateData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all.key });
      // Crucial: Invalidate consolidated day data to sync Kanban board
      queryClient.invalidateQueries({ 
        queryKey: plannerDayQueries.byDate(data.date).key 
      });
      toast.success("Todo updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update todo");
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
      // Invalidate all planner days as we don't have the date here
      // This is safe as it resets the day view data after a deletion
      queryClient.invalidateQueries({ queryKey: ["planner-day", "admin"] });
      toast.success("Todo deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete todo");
    },
  });
};
