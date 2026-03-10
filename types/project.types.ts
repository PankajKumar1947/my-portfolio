import { Types } from "mongoose";

export interface IProject {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  tags?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: "draft" | "published" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProjectDTO = Pick<
  IProject,
  | "title"
  | "description"
  | "image"
  | "tags"
  | "githubUrl"
  | "liveUrl"
  | "featured"
  | "status"
>;

export type UpdateProjectDTO = Partial<CreateProjectDTO>;
