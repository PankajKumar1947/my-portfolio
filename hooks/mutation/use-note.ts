import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { noteQueries } from "@/react-query/note";
import { CreateNoteDTO, UpdateNoteDTO, INote, INotePage } from "@/types/note.types";
import { AxiosError } from "axios";

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
    },
    onError: (error: AxiosError<{ message: string }>) => {
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
    },
  });
};

export const useUpdateNotePage = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ pageId, data }: { pageId: string; data: Partial<INotePage> }) => {
      const response = await axiosInstance.patch<INote>(
        noteQueries.updatePage(noteId, pageId).endpoint,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.all.key });
      queryClient.invalidateQueries({ queryKey: noteQueries.details(noteId).key });
    },
  });
};

export const useCreateNotePage = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<INotePage>) => {
      const response = await axiosInstance.post<INotePage>(
        noteQueries.createPage(noteId).endpoint,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.all.key });
      queryClient.invalidateQueries({ queryKey: noteQueries.details(noteId).key });
    },
  });
};

export const useDeleteNotePage = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pageId: string) => {
      await axiosInstance.delete(
        noteQueries.updatePage(noteId, pageId).endpoint
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.all.key });
      queryClient.invalidateQueries({ queryKey: noteQueries.details(noteId).key });
    },
  });
};

export const useReorderNotePages = (noteId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: { pageId: string; order: number }[]) => {
      await axiosInstance.patch(
        noteQueries.reorderPages(noteId).endpoint,
        updates
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteQueries.details(noteId).key });
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
    },
  });
};
