import { INotePage } from "@/types/note.types";
import mongoose, { Model, Schema } from "mongoose";

const notePageSchema = new Schema<INotePage>(
  {
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

if (mongoose.models.NotePage) {
  delete mongoose.models.NotePage;
}

export const NotePageModel: Model<INotePage> =
  mongoose.models.NotePage || mongoose.model<INotePage>("NotePage", notePageSchema);
