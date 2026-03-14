import { ITodo } from "@/types/todo.types";
import mongoose, { Model, Schema } from "mongoose";

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["planned_today", "ongoing", "completed", "tomorrow_plan"],
    },
  },
  { timestamps: true }
);

// Prevent model overwrite on HMR
if (mongoose.models.Todo) delete mongoose.models.Todo;
export const TodoModel: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);
