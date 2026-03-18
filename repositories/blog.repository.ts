import { BlogModel } from "@/models/blog.model";
import { CreateBlogDTO, IBlog, UpdateBlogDTO } from "@/types/blog.types";
import { Types } from "mongoose";

export const createBlog = async (data: CreateBlogDTO): Promise<IBlog> => {
  const blog = await BlogModel.create(data);
  return blog;
}

export const updateBlog = async (
  blogId: Types.ObjectId,
  data: UpdateBlogDTO
): Promise<IBlog | null> => {
  return await BlogModel.findByIdAndUpdate(blogId, data, { returnDocument: 'after' });
};

export const deleteBlog = async (
  blogId: Types.ObjectId
): Promise<IBlog | null> => {
  return await BlogModel.findByIdAndDelete(blogId);
};

export const getBlogs = async (query: Record<string, unknown> = {}): Promise<IBlog[]> => {
  return await BlogModel.find(query).select("-content").sort({ createdAt: -1 }).lean();
};

export const getPublishedBlogs = async (): Promise<IBlog[]> => {
  return await BlogModel.find({ status: "published" })
    .select("-content")
    .sort({ createdAt: -1 })
    .lean();
};

export const getBlog = async (
  blogId: Types.ObjectId
): Promise<IBlog | null> => {
  return await BlogModel.findById(blogId).lean();
};

export const getBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  return await BlogModel.findOne({ slug });
};