import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { blogQueries } from "@/react-query/blog";
import { CreateBlogDTO, UpdateBlogDTO, IBlog } from "@/types/blog.types";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: blogQueries.create.key,
    mutationFn: async (data: CreateBlogDTO) => {
      const response = await axiosInstance.post<IBlog>(blogQueries.create.endpoint, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueries.all.key });
      console.log("Blog post created successfully");
    },
    onError: (error: any) => {
      console.error("Failed to create blog post", error);
    },
  });
};

export const useUpdateBlog = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: blogQueries.update(id).key,
    mutationFn: async (data: UpdateBlogDTO) => {
      const response = await axiosInstance.patch<IBlog>(
        blogQueries.update(id).endpoint,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogQueries.all.key });
      queryClient.invalidateQueries({ queryKey: blogQueries.details(data.slug).key });
      console.log("Blog post updated successfully");
    },
    onError: (error: any) => {
      console.error("Failed to update blog post", error);
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(blogQueries.delete(id).endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueries.all.key });
      console.log("Blog post deleted successfully");
    },
    onError: (error: any) => {
      console.error("Failed to delete blog post", error);
    },
  });
};
