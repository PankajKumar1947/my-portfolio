import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { IDayData, IPlannerDay, UpsertPlannerDayDTO } from "@/types/todo.types";
import { toast } from "sonner";
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

export const useUpsertPlannerDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpsertPlannerDayDTO) => {
      const response = await axiosInstance.patch<IPlannerDay>(
        plannerDayQueries.upsert.endpoint,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: plannerDayQueries.byDate(data.date).key,
      });
      toast.success("Remarks updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update remarks");
    },
  });
};
