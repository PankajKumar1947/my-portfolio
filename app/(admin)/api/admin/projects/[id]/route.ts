import { NextResponse } from "next/server";
import {
  deleteProjectService,
  getProjectService,
  updateProjectService,
} from "@/services/project.service";
import { Types } from "mongoose";
import { updateProjectSchema } from "@/validations/projects.schema";
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

    const project = await getProjectService(new Types.ObjectId(id));
    if (!project) {
      throw new ApiError("Project not found", 404);
    }

    return NextResponse.json(project);
  }
);

export const PATCH = apiHandler(
  async (req: Request, { params }: RouteParams) => {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid ID", 400);
    }

    const body = await req.json();
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const project = await updateProjectService(
      new Types.ObjectId(id),
      parsed.data
    );
    if (!project) {
      throw new ApiError("Project not found", 404);
    }

    return NextResponse.json(project);
  }
);

export const DELETE = apiHandler(
  async (_req: Request, { params }: RouteParams) => {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid ID", 400);
    }

    const project = await deleteProjectService(new Types.ObjectId(id));
    if (!project) {
      throw new ApiError("Project not found", 404);
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  }
);
