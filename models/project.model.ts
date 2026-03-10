import mongoose, { Model, Schema } from "mongoose";
import { IProject } from "@/types/project.types";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tags: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Force delete the model to ensure schema changes are applied
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
