import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { IDayData } from "@/types/planner-day.types";
import { plannerDayQueries } from "@/react-query/planner-day";

export const usePlannerDay = (date: string) => {
  return useQuery({
    queryKey: plannerDayQueries.byDate(date).key,
    queryFn: async () => {
      const response = await axiosInstance.get<IDayData>(plannerDayQueries.byDate(date).endpoint);
      return response.data;
    },
    enabled: !!date,
  });
};
