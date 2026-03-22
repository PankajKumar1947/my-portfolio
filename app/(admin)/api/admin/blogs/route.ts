import { NextResponse } from "next/server";
import { createBlogService, getBlogsService } from "@/services/blog.service";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const blogs = await getBlogsService();
  return NextResponse.json(blogs);
});

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();
  const blog = await createBlogService(body);
  return NextResponse.json(blog, { status: 201 });
});
