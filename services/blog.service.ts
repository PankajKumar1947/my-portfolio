import { CreateBlogDTO, IBlog, UpdateBlogDTO } from "@/types/blog.types";
import * as blogRepo from "@/repositories/blog.repository";
import { Types } from "mongoose";

export const createBlogService = async (
  data: CreateBlogDTO
): Promise<IBlog> => {
  const existing = await blogRepo.getBlogBySlug(data.slug);

  if (existing) {
    throw new Error("Blog with this slug already exists");
  }

  return blogRepo.createBlog(data);
};

export const updateBlogService = async (
  blogId: Types.ObjectId,
  data: UpdateBlogDTO
): Promise<IBlog | null> => {
  if (data.slug) {
    const existing = await blogRepo.getBlogBySlug(data.slug);
    if (existing && existing._id.toString() !== blogId.toString()) {
      throw new Error("Another blog with this slug already exists");
    }
  }

  return blogRepo.updateBlog(blogId, data);
};

export const deleteBlogService = async (
  blogId: Types.ObjectId
): Promise<IBlog | null> => {
  return blogRepo.deleteBlog(blogId);
};

export const getBlogsService = async (): Promise<IBlog[]> => {
  return blogRepo.getBlogs();
};

export const getPublishedBlogsService = async (): Promise<IBlog[]> => {
  return blogRepo.getPublishedBlogs();
};

export const getBlogService = async (
  blogId: Types.ObjectId
): Promise<IBlog | null> => {
  return blogRepo.getBlog(blogId);
};

export const getBlogBySlugService = async (
  slug: string
): Promise<IBlog | null> => {
  return blogRepo.getBlogBySlug(slug);
};
