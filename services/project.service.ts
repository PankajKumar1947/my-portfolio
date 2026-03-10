import { CreateProjectDTO, IProject, UpdateProjectDTO } from "@/types/project.types";
import * as projectRepo from "@/repositories/project.repository";
import { Types } from "mongoose";

export const createProjectService = async (
  data: CreateProjectDTO
): Promise<IProject> => {
  return projectRepo.createProject(data);
};

export const updateProjectService = async (
  projectId: Types.ObjectId,
  data: UpdateProjectDTO
): Promise<IProject | null> => {
  return projectRepo.updateProject(projectId, data);
};

export const deleteProjectService = async (
  projectId: Types.ObjectId
): Promise<IProject | null> => {
  return projectRepo.deleteProject(projectId);
};

export const getProjectsService = async (): Promise<IProject[]> => {
  return projectRepo.getProjects();
};

export const getProjectService = async (
  projectId: Types.ObjectId
): Promise<IProject | null> => {
  return projectRepo.getProject(projectId);
};
