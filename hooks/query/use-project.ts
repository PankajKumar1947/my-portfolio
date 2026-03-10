import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { projectQueries } from "@/react-query/project";
import { IProject } from "@/types/project.types";

export const useProjects = () => {
  return useQuery({
    queryKey: projectQueries.all.key,
    queryFn: async () => {
      const response = await axiosInstance.get<IProject[]>(projectQueries.all.endpoint);
      return response.data;
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: projectQueries.details(id).key,
    queryFn: async () => {
      const response = await axiosInstance.get<IProject>(projectQueries.details(id).endpoint);
      return response.data;
    },
    enabled: !!id,
  });
};
