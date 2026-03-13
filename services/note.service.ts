import { CreateNoteDTO, INote, INoteListItem, UpdateNoteDTO, INotePage } from "@/types/note.types";
import * as noteRepo from "@/repositories/note.repository";
import { Types } from "mongoose";

export const createNoteService = async (
  data: CreateNoteDTO
): Promise<INote> => {
  const existing = await noteRepo.getNoteBySlug(data.slug);

  if (existing) {
    throw new Error("Note with this slug already exists");
  }

  return noteRepo.createNote(data);
};

export const updateNoteService = async (
  noteId: Types.ObjectId,
  data: UpdateNoteDTO
): Promise<INote | null> => {
  if (data.slug) {
    const existing = await noteRepo.getNoteBySlug(data.slug);
    if (existing && existing._id.toString() !== noteId.toString()) {
      throw new Error("Another note with this slug already exists");
    }
  }

  return noteRepo.updateNote(noteId, data);
};

export const deleteNoteService = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  return noteRepo.deleteNote(noteId);
};

export const getNotesService = async (): Promise<INoteListItem[]> => {
  return noteRepo.getNotes();
};

export const getPublishedNotesService = async (): Promise<INote[]> => {
  return noteRepo.getPublishedNotes();
};

export const getNoteService = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  return noteRepo.getNote(noteId);
};

export const getNoteBySlugService = async (
  slug: string
): Promise<INote | null> => {
  return noteRepo.getNoteBySlug(slug);
};

export const updateNotePageService = async (
  noteId: Types.ObjectId,
  pageId: string,
  data: Partial<INotePage>
): Promise<INote | null> => {
  return noteRepo.updateNotePage(noteId, pageId, data);
};

export const getNotePageByIdService = async (
  noteId: Types.ObjectId,
  pageId: string
): Promise<INote | null> => {
  return noteRepo.getNotePageById(noteId, pageId);
};

export const getNoteIdByPageIdService = async (
  pageId: string
): Promise<Types.ObjectId | null> => {
  return noteRepo.getNoteIdByPageId(pageId);
};

export const createNotePageService = async (
  noteId: Types.ObjectId,
  data: Partial<INotePage>
): Promise<INotePage> => {
  return noteRepo.createNotePage(noteId, data);
};

export const deleteNotePageService = async (
  noteId: Types.ObjectId,
  pageId: string
): Promise<boolean> => {
  return noteRepo.deleteNotePage(noteId, pageId);
};

export const reorderNotePagesService = async (
  noteId: Types.ObjectId,
  updates: { pageId: string; order: number }[]
): Promise<void> => {
  return noteRepo.reorderNotePages(noteId, updates);
};
