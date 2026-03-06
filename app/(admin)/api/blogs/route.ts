import { NextResponse } from "next/server";
import {
  createBlogService,
  getBlogsService,
} from "@/services/blog.service";
import { blogSchema } from "@/validations/blogs.schema";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const blogs = await getBlogsService();
  return NextResponse.json(blogs);
});

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();

  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const blog = await createBlogService(parsed.data as any);
  return NextResponse.json(blog, { status: 201 });
});
