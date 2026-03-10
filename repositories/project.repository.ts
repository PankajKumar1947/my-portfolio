import { ProjectModel } from "@/models/project.model";
import { CreateProjectDTO, IProject, UpdateProjectDTO } from "@/types/project.types";
import { Types } from "mongoose";

export const createProject = async (data: CreateProjectDTO): Promise<IProject> => {
  const project = await ProjectModel.create(data);
  return project;
};

export const updateProject = async (
  projectId: Types.ObjectId,
  data: UpdateProjectDTO
): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndUpdate(projectId, data, {
    returnDocument: "after",
  });
};

export const deleteProject = async (
  projectId: Types.ObjectId
): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndDelete(projectId);
};

export const getProjects = async (): Promise<IProject[]> => {
  return await ProjectModel.find({}).sort({ createdAt: -1 });
};

export const getProject = async (
  projectId: Types.ObjectId
): Promise<IProject | null> => {
  return await ProjectModel.findById(projectId);
};
