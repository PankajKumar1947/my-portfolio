import { useQuery } from "@tanstack/react-query";
import { authQueries } from "@/react-query/auth";
import axiosInstance from "@/services/api/axios";

export const useAuthSession = () => {
  return useQuery({
    queryKey: authQueries.me.key,
    queryFn: async () => {
      const response = await axiosInstance.get(authQueries.me.endpoint);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};
