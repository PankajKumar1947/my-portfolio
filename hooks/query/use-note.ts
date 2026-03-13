import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { noteQueries } from "@/react-query/note";
import { INote, INoteListItem, INotePage } from "@/types/note.types";

export const useNotes = () => {
  return useQuery({
    queryKey: noteQueries.all.key,
    queryFn: async () => {
      const response = await axiosInstance.get<INoteListItem[]>(noteQueries.all.endpoint);
      return response.data;
    },
  });
};

export const usePublishedNotes = () => {
  return useQuery({
    queryKey: noteQueries.published.key,
    queryFn: async () => {
      const response = await axiosInstance.get<INote[]>(noteQueries.published.endpoint);
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

export const useNote = (slug: string) => {
  return useQuery({
    queryKey: noteQueries.bySlug(slug).key,
    queryFn: async () => {
      const response = await axiosInstance.get<INote>(noteQueries.bySlug(slug).endpoint);
      return response.data;
    },
    enabled: !!slug,
  });
};

export const useNotePage = (slug: string, pageId: string) => {
  return useQuery({
    queryKey: noteQueries.pageContent(slug, pageId).key,
    queryFn: async () => {
      const response = await axiosInstance.get<INotePage>(noteQueries.pageContent(slug, pageId).endpoint);
      return response.data;
    },
    enabled: !!slug && !!pageId,
  });
};

export const useAdminNotePage = (id: string, pageId: string) => {
  return useQuery({
    queryKey: noteQueries.adminPageContent(id, pageId).key,
    queryFn: async () => {
      const response = await axiosInstance.get<INotePage>(
        noteQueries.adminPageContent(id, pageId).endpoint
      );
      return response.data;
    },
    enabled: !!id && !!pageId,
  });
};

export const useNoteParent = (pageId: string) => {
  return useQuery({
    queryKey: noteQueries.pageParent(pageId).key,
    queryFn: async () => {
      const response = await axiosInstance.get<{ noteId: string }>(
        noteQueries.pageParent(pageId).endpoint
      );
      return response.data.noteId;
    },
    enabled: !!pageId,
  });
};
