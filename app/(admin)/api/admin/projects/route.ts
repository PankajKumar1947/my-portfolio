import { NextResponse } from "next/server";
import { createProjectService, getProjectsService } from "@/services/project.service";
import { projectSchema } from "@/validations/projects.schema";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const projects = await getProjectsService();
  return NextResponse.json(projects);
});

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const project = await createProjectService(parsed.data);
  return NextResponse.json(project, { status: 201 });
});
