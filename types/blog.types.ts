import { Types } from "mongoose";

export type BlogStatus = "draft" | "published" | "inactive";

export interface IBlog {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  coverImg: string;
  readTime: string;
  status: BlogStatus;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBlogDTO = Pick<
  IBlog,
  "title" | "slug" | "excerpt" | "coverImg" | "status" | "content" | "author" | "readTime"
>;

export type UpdateBlogDTO = Partial<CreateBlogDTO>;