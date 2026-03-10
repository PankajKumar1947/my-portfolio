import { NextResponse } from "next/server";
import { getPublishedProjectsService } from "@/services/project.service";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const projects = await getPublishedProjectsService();
  return NextResponse.json(projects);
});
