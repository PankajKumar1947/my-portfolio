import { CreateNoteDTO, INote, UpdateNoteDTO } from "@/types/note.types";
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

export const getNotesService = async (): Promise<INote[]> => {
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
