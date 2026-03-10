import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { noteQueries } from "@/react-query/note";
import { CreateNoteDTO, UpdateNoteDTO, INote } from "@/types/note.types";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: noteQueries.create.key,
    mutationFn: async (data: CreateNoteDTO) => {
      const response = await axiosInstance.post<INote>(noteQueries.create.endpoint, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.all.key });
      console.log("Note created successfully");
    },
    onError: (error: any) => {
      console.error("Failed to create note", error);
    },
  });
};

export const useUpdateNote = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: noteQueries.update(id).key,
    mutationFn: async (data: UpdateNoteDTO) => {
      const response = await axiosInstance.patch<INote>(
        noteQueries.update(id).endpoint,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.all.key });
      queryClient.invalidateQueries({ queryKey: noteQueries.details(id).key });
      console.log("Note updated successfully");
    },
    onError: (error: any) => {
      console.error("Failed to update note", error);
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(noteQueries.delete(id).endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.all.key });
      console.log("Note deleted successfully");
    },
    onError: (error: any) => {
      console.error("Failed to delete note", error);
    },
  });
};
