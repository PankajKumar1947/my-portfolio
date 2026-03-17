import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { projectQueries } from "@/react-query/project";
import { CreateProjectDTO, IProject, UpdateProjectDTO } from "@/types/project.types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateProjectDTO) => {
      const response = await axiosInstance.post<IProject>(projectQueries.create.endpoint, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueries.all.key });
      toast.success("Project created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create project");
    },
  });
};

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateProjectDTO) => {
      const response = await axiosInstance.patch<IProject>(projectQueries.update(id).endpoint, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueries.all.key });
      queryClient.invalidateQueries({ queryKey: projectQueries.details(id).key });
      toast.success("Project updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update project");
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(projectQueries.delete(id).endpoint);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueries.all.key });
      toast.success("Project deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete project");
    },
  });
};
