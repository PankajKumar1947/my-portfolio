import { Types } from "mongoose";

export interface INotePage {
  _id?: string | Types.ObjectId;
  noteId?: string | Types.ObjectId;
  title: string;
  content: string;
  order: number;
}

export interface INote {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  pages: (INotePage | Types.ObjectId)[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteListItem {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  firstPageId: string | null;
  noPages: number;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export type CreateNoteDTO = Pick<
  INote,
  "title" | "slug" | "description" | "status"
> & { pages?: Partial<INotePage>[] };

export type UpdateNoteDTO = Partial<Omit<CreateNoteDTO, "pages"> & { 
  pages?: (Partial<INotePage> | string | Types.ObjectId)[] 
}>;
