import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { contactQueries } from "@/react-query/contact";
import { ContactValues } from "@/validations/contact.schema";
import { ContactStatus } from "@/types/contact.types";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (data: ContactValues) => {
      const response = await axiosInstance.post(contactQueries.submit.endpoint, data);
      return response.data;
    },
  });
};

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ContactStatus }) => {
      const response = await axiosInstance.patch(contactQueries.update(id).endpoint, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactQueries.all.key });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(contactQueries.delete(id).endpoint);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactQueries.all.key });
    },
  });
};
