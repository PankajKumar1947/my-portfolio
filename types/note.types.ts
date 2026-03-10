import { Types } from "mongoose";

export interface INotePage {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface INote {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  pages: INotePage[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export type CreateNoteDTO = Pick<
  INote,
  "title" | "slug" | "description" | "status" | "pages"
>;

export type UpdateNoteDTO = Partial<CreateNoteDTO>;
