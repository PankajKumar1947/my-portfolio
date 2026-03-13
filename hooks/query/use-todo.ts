import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { todoQueries } from "@/react-query/todo";
import { ITodo } from "@/types/todo.types";

export const useTodosByMonth = (month: string) => {
  return useQuery({
    queryKey: todoQueries.byMonth(month).key,
    queryFn: async () => {
      const response = await axiosInstance.get<ITodo[]>(todoQueries.byMonth(month).endpoint);
      return response.data;
    },
    enabled: !!month,
  });
};

export const useTodosByDate = (date: string) => {
  return useQuery({
    queryKey: todoQueries.byDate(date).key,
    queryFn: async () => {
      const response = await axiosInstance.get<ITodo[]>(todoQueries.byDate(date).endpoint);
      return response.data;
    },
    enabled: !!date,
  });
};
