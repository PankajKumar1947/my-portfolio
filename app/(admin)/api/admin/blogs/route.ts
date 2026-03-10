import { NextResponse } from "next/server";
import { getPublishedBlogsService } from "@/services/blog.service";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const blogs = await getPublishedBlogsService();
  return NextResponse.json(blogs);
});
