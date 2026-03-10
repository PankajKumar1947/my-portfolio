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
  return await NoteModel.find({})
    .select("-pages.content")
    .sort({ createdAt: -1 });
};

export const getPublishedNotes = async (): Promise<INote[]> => {
  return await NoteModel.find({ status: "published" })
    .select("-pages.content")
    .sort({ createdAt: -1 });
};

export const getNote = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  return await NoteModel.findById(noteId);
};

export const getNoteBySlug = async (slug: string): Promise<INote | null> => {
  return await NoteModel.findOne({ slug }).select("-pages.content");
};

export const getNotePage = async (
  slug: string,
  pageId: string
): Promise<INote | null> => {
  // We return the whole note but only with the requested page in the pages array
  return await NoteModel.findOne(
    { slug, "pages.id": pageId },
    { "pages.$": 1, title: 1, slug: 1 }
  );
};
