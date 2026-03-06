import { NextResponse } from "next/server";
import {
  deleteBlogService,
  getBlogService,
  updateBlogService,
} from "@/services/blog.service";
import { Types } from "mongoose";
import { updateBlogSchema } from "@/validations/blogs.schema";
import { apiHandler, ApiError } from "@/lib/api-handler";
import { UpdateBlogDTO } from "@/types/blog.types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export const GET = apiHandler(
  async (_req: Request, { params }: RouteParams) => {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid ID", 400);
    }

    const blog = await getBlogService(new Types.ObjectId(id));
    if (!blog) {
      throw new ApiError("Blog not found", 404);
    }

    return NextResponse.json(blog);
  }
);

export const PATCH = apiHandler(
  async (req: Request, { params }: RouteParams) => {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid ID", 400);
    }

    const body = await req.json();
    const parsed = updateBlogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const blog = await updateBlogService(
      new Types.ObjectId(id),
      parsed.data as UpdateBlogDTO
    );
    if (!blog) {
      throw new ApiError("Blog not found", 404);
    }

    return NextResponse.json(blog);
  }
);

export const DELETE = apiHandler(
  async (_req: Request, { params }: RouteParams) => {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid ID", 400);
    }

    const blog = await deleteBlogService(new Types.ObjectId(id));
    if (!blog) {
      throw new ApiError("Blog not found", 404);
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  }
);
