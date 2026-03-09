import { NextResponse } from "next/server";
import { getBlogService } from "@/services/blog.service";
import { Types } from "mongoose";
import { apiHandler, ApiError } from "@/lib/api-handler";

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
