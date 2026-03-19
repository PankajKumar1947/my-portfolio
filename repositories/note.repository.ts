import { NoteModel } from "@/models/note.model";
import { NotePageModel } from "@/models/note-page.model";
import { CreateNoteDTO, INote, INoteListItem, UpdateNoteDTO, INotePage } from "@/types/note.types";
import { Types } from "mongoose";

export const createNote = async (data: CreateNoteDTO): Promise<INote> => {
  const { pages, ...noteData } = data;
  const note = await NoteModel.create({ ...noteData, pages: [] });

  let pageDocsToInsert = [];
  if (pages && pages.length > 0) {
    pageDocsToInsert = pages.map((p) => ({ ...p, noteId: note._id }));
  } else {
    // Backend default page creation
    pageDocsToInsert = [
      {
        title: "Page 1",
        content: "",
        order: 1,
        noteId: note._id,
      },
    ];
  }

  const insertedPages = await NotePageModel.insertMany(pageDocsToInsert);
  note.pages = insertedPages.map((p) => p._id as Types.ObjectId);
  await note.save();

  const populatedNote = await NoteModel.findById(note._id).populate({
    path: "pages",
    select: "-content",
    options: { sort: { order: 1 } },
  });

  return populatedNote as INote;
};

export const updateNote = async (
  noteId: Types.ObjectId,
  data: UpdateNoteDTO
): Promise<INote | null> => {
  const { pages, ...noteData } = data;

  if (pages) {
    // Sync Note Pages
    const currentPages = await NotePageModel.find({ noteId });
    const payloadIds = pages
      .map((p) => (typeof p === "object" && "_id" in p ? p._id?.toString() : p.toString()))
      .filter(Boolean);

    // 1. Delete pages not in payload (ignoring new temp ids naturally)
    const pagesToDelete = currentPages.filter((p) => !payloadIds.includes(p._id.toString()));
    if (pagesToDelete.length > 0) {
      await NotePageModel.deleteMany({ _id: { $in: pagesToDelete.map((p) => p._id) } });
    }

    const newPageRefs: Types.ObjectId[] = [];

    // 2. Upsert pages sent
    for (const pagePayload of pages) {
      if (typeof pagePayload !== "object" || !("_id" in pagePayload)) {
        // If it's just an ID, keep it as is
        if (pagePayload) newPageRefs.push(new Types.ObjectId(pagePayload.toString()));
        continue;
      }

      const p = pagePayload as Partial<INotePage>;
      if (!p._id) continue;

      const idStr = p._id.toString();
      const isTemp = idStr.startsWith("temp-");

      if (!isTemp) {
        let pageDoc = await NotePageModel.findOne({ noteId, _id: p._id });
        if (pageDoc) {
          // Update existing
          const { _id, noteId: _, ...updateFields } = p;
          await NotePageModel.updateOne({ _id: pageDoc._id }, { $set: updateFields });
          newPageRefs.push(pageDoc._id as Types.ObjectId);
          continue;
        }
      }

      // Create new
      const { _id, ...newFields } = p;
      const newPage = await NotePageModel.create({ ...newFields, noteId });
      newPageRefs.push(newPage._id as Types.ObjectId);
    }

    // Assign strictly the newly synced array to NoteDoc
    const updatePayload = { ...noteData, pages: newPageRefs };

    return await NoteModel.findByIdAndUpdate(noteId, updatePayload, {
      new: true,
      runValidators: true,
    }).populate({ path: "pages", select: "-content", options: { sort: { order: 1 } } });
  }

  return await NoteModel.findByIdAndUpdate(noteId, noteData, {
    new: true,
    runValidators: true,
  }).populate({ path: "pages", select: "-content", options: { sort: { order: 1 } } });
};

export const deleteNote = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  await NotePageModel.deleteMany({ noteId });
  return await NoteModel.findByIdAndDelete(noteId);
};

export const getNotes = async (): Promise<INoteListItem[]> => {
  const notes = await NoteModel.find({}).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    _id: note._id as Types.ObjectId,
    title: note.title,
    slug: note.slug,
    description: note.description,
    status: note.status,
    firstPageId: note.pages?.length > 0 ? note.pages[0].toString() : null,
    noPages: note.pages?.length || 0,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  }));
};

export const getPublishedNotes = async (): Promise<INote[]> => {
  return await NoteModel.find({ status: "published" })
    .populate({ path: "pages", select: "-content", options: { sort: { order: 1 } } })
    .sort({ createdAt: -1 })
    .lean();
};

export const getNote = async (
  noteId: Types.ObjectId
): Promise<INote | null> => {
  return await NoteModel.findById(noteId)
    .populate({ path: "pages", select: "-content", options: { sort: { order: 1 } } })
    .lean();
};

export const getNoteBySlug = async (slug: string): Promise<INote | null> => {
  return await NoteModel.findOne({ slug })
    .populate({ path: "pages", select: "-content", options: { sort: { order: 1 } } })
    .lean();
};

export const getNotePage = async (
  slug: string,
  pageId: string
): Promise<INote | null> => {
  const note = await NoteModel.findOne({ slug }).select("_id title slug");
  if (!note) return null;

  const page = await NotePageModel.findOne({ noteId: note._id, _id: pageId });
  if (!page) return null;

  // Emulate legacy return shape (note embedding pages)
  const fullNote = note.toObject();
  fullNote.pages = [page.toObject()];
  return fullNote as unknown as INote;
};

export const getNotePageById = async (
  noteId: Types.ObjectId,
  pageId: string
): Promise<INote | null> => {
  const note = await NoteModel.findById(noteId).select("_id title slug");
  if (!note) return null;

  const page = await NotePageModel.findOne({ noteId, _id: pageId });
  if (!page) return null;

  const fullNote = note.toObject();
  fullNote.pages = [page.toObject()];
  return fullNote as unknown as INote;
};

export const updateNotePage = async (
  noteId: Types.ObjectId,
  pageId: string,
  data: Partial<INotePage>
): Promise<INote | null> => {
  const setFields = { ...data };
  delete setFields._id;
  delete setFields.noteId;

  const updatedPage = await NotePageModel.findOneAndUpdate(
    { noteId, _id: pageId },
    { $set: setFields },
    { new: true, runValidators: true }
  );

  if (!updatedPage) return null;

  const note = await NoteModel.findById(noteId).select("_id title slug description status createdAt updatedAt");
  if (!note) return null;

  const fullNote = note.toObject();
  fullNote.pages = [updatedPage.toObject()];
  return fullNote as INote;
};

export const getNoteIdByPageId = async (
  pageId: string
): Promise<Types.ObjectId | null> => {
  const page = await NotePageModel.findById(pageId).select("noteId");
  if (!page) return null;
  return page.noteId as Types.ObjectId;
};

export const createNotePage = async (
  noteId: Types.ObjectId,
  data: Partial<INotePage>
): Promise<INotePage> => {
  const page = await NotePageModel.create({ ...data, noteId });
  await NoteModel.findByIdAndUpdate(noteId, { $push: { pages: page._id } });
  return page.toObject() as INotePage;
};

export const deleteNotePage = async (
  noteId: Types.ObjectId,
  pageId: string
): Promise<boolean> => {
  const result = await NotePageModel.findOneAndDelete({ _id: pageId, noteId });
  if (!result) return false;
  await NoteModel.findByIdAndUpdate(noteId, { $pull: { pages: pageId } });
  return true;
};

export const reorderNotePages = async (
  noteId: Types.ObjectId,
  updates: { pageId: string; order: number }[]
): Promise<void> => {
  await Promise.all(
    updates.map(({ pageId, order }) =>
      NotePageModel.updateOne({ _id: pageId, noteId }, { $set: { order } })
    )
  );
};
