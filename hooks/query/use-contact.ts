import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { contactQueries } from "@/react-query/contact";
import { IContact } from "@/types/contact.types";

export const useAdminContacts = (status?: string[]) => {
  const queryParams = status?.length ? `?status=${status.join(",")}` : "";
  return useQuery<IContact[]>({
    queryKey: [...contactQueries.all.key, status],
    queryFn: async () => {
      const response = await axiosInstance.get(`${contactQueries.all.endpoint}${queryParams}`);
      return response.data;
    },
  });
};

export const useAdminContact = (id: string) => {
  return useQuery<IContact>({
    queryKey: contactQueries.details(id).key,
    queryFn: async () => {
      const response = await axiosInstance.get(contactQueries.details(id).endpoint);
      return response.data;
    },
    enabled: !!id,
  });
};
