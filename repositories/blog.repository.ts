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

export const getBlogs = async (): Promise<IBlog[]> => {
  return await BlogModel.find({}).select("-content");
};

export const getBlog = async (
  blogId: Types.ObjectId
): Promise<IBlog | null> => {
  return await BlogModel.findById(blogId).populate("author");
};

export const getBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  return await BlogModel.findOne({ slug }).populate("author");
};