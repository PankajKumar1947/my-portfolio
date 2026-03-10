import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { noteQueries } from "@/react-query/note";
import { INote } from "@/types/note.types";

export const useNotes = () => {
  return useQuery({
    queryKey: noteQueries.all.key,
    queryFn: async () => {
      const response = await axiosInstance.get<INote[]>(noteQueries.all.endpoint);
      return response.data;
    },
  });
};

export const useNoteById = (id: string) => {
  return useQuery({
    queryKey: noteQueries.details(id).key,
    queryFn: async () => {
      const response = await axiosInstance.get<INote>(noteQueries.details(id).endpoint);
      return response.data;
    },
    enabled: !!id,
  });
};
