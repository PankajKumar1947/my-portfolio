import { NextResponse } from "next/server";
import { getBlogBySlugService } from "@/services/blog.service";
import { apiHandler, ApiError } from "@/lib/api-handler";

export const GET = apiHandler(
  async (_req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const blog = await getBlogBySlugService(slug);

    if (!blog || blog.status !== "published") {
      throw new ApiError("Blog not found", 404);
    }

    return NextResponse.json(blog);
  }
);
