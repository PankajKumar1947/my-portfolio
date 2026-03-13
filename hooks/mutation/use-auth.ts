import { authQueries } from "@/react-query/auth";
import axiosInstance from "@/services/api/axios";
import { LoginValues } from "@/validations/auth.schema";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: authQueries.login.key,
    mutationFn: async (data: LoginValues) => {
      console.log("Attempting login with:", data.email);
      const response = await axiosInstance.post(authQueries.login.endpoint, data);
      console.log("Login response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful, redirecting to /admin...", data);
      router.push("/admin");
    },
    onError: (error) => {
      console.error("Login mutation error:", error);
    }
  })
}

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: authQueries.logout.key,
    mutationFn: async () => {
      const response = await axiosInstance.post(authQueries.logout.endpoint);
      return response.data;
    },
    onSuccess: () => {
      console.log("Logout successful, redirecting to /login...");
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout mutation error:", error);
    }
  })
}