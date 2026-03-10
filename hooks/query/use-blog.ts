import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { blogQueries } from "@/react-query/blog";
import { IBlog } from "@/types/blog.types";

export const useBlogs = () => {
  return useQuery({
    queryKey: blogQueries.all.key,
    queryFn: async () => {
      const response = await axiosInstance.get<IBlog[]>(blogQueries.all.endpoint);
      return response.data;
    },
  });
};

export const usePublishedBlogs = () => {
  return useQuery({
    queryKey: blogQueries.published.key,
    queryFn: async () => {
      const response = await axiosInstance.get<IBlog[]>(blogQueries.published.endpoint);
      return response.data;
    },
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: blogQueries.details(slug).key,
    queryFn: async () => {
      const response = await axiosInstance.get<IBlog>(blogQueries.details(slug).endpoint);
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useAdminBlog = (id: string) => {
  return useQuery({
    queryKey: blogQueries.update(id).key,
    queryFn: async () => {
      const response = await axiosInstance.get<IBlog>(blogQueries.update(id).endpoint);
      return response.data;
    },
    enabled: !!id,
  });
};
