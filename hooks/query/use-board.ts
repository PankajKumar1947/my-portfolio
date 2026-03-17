import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { IBoard, IBoardMeta } from "@/types/board.types";
import { toast } from "sonner";

export const useBoards = () => {
  return useQuery<IBoardMeta[]>({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/admin/boards");
      return data;
    },
  });
};

export const useBoard = (id: string) => {
  return useQuery<IBoard>({
    queryKey: ["boards", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/admin/boards/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<IBoard>) => {
      const { data: response } = await axiosInstance.post("/admin/boards", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board created successfully");
    },
    onError: () => {
      toast.error("Failed to create board");
    },
  });
};

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<IBoard> }) => {
      const { data: response } = await axiosInstance.patch(`/admin/boards/${id}`, data);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["boards", variables.id] });
      toast.success("Board updated successfully");
    },
    onError: () => {
      toast.error("Failed to update board");
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/admin/boards/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete board");
    },
  });
};
