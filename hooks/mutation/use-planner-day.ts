import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { plannerDayQueries } from "@/react-query/planner-day";
import { IPlannerDay, UpsertPlannerDayDTO } from "@/types/planner-day.types";
import { toast } from "sonner";

export const useUpsertPlannerDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpsertPlannerDayDTO) => {
      const response = await axiosInstance.patch<IPlannerDay>(plannerDayQueries.upsert.endpoint, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: plannerDayQueries.byDate(data.date).key,
      });
      toast.success("Remark added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add remark");
    },
  });
};
