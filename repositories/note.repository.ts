import { NoteModel } from "@/models/note.model";
import { CreateNoteDTO, INote, UpdateNoteDTO } from "@/types/note.types";
import { Types } from "mongoose";

export const createNote = async (data: CreateNoteDTO): Promise<INote> => {
  const note = await NoteModel.create(data);
  return note;
};

export const updateNote = async (
  noteId: Types.ObjectId,
  data: UpdateNoteDTO
): Promise<INote | null> => {
  return await NoteModel.findByIdAndUpdate(noteId, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteNote = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  return await NoteModel.findByIdAndDelete(noteId);
};

export const getNotes = async (): Promise<INote[]> => {
  return await NoteModel.find({}).sort({ createdAt: -1 });
};

export const getNote = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  return await NoteModel.findById(noteId);
};

export const getNoteBySlug = async (slug: string): Promise<INote | null> => {
  return await NoteModel.findOne({ slug });
};
