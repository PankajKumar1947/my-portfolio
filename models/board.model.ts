import mongoose, { Model, Schema } from "mongoose";
import { IBoard } from "@/types/board.types";

const boardSchema = new Schema<IBoard>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scene: {
      elements: {
        type: [Schema.Types.Mixed],
        default: [],
      },
      appState: {
        type: Schema.Types.Mixed,
        default: {},
      },
      files: {
        type: Schema.Types.Mixed,
        default: {},
      },
    },
  },
  { timestamps: true }
);

// Force delete the model to ensure schema changes are applied
if (mongoose.models.Board) {
  delete mongoose.models.Board;
}

export const BoardModel: Model<IBoard> =
  mongoose.models.Board || mongoose.model<IBoard>("Board", boardSchema);
