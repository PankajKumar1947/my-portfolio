import { INote, INotePage } from "@/types/note.types";
import mongoose, { Model, Schema } from "mongoose";

const notePageSchema = new Schema<INotePage>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  order: { type: Number, required: true },
});

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    pages: {
      type: [notePageSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

// Force delete the model to ensure schema changes are applied
if (mongoose.models.Note) {
  delete mongoose.models.Note;
}

export const NoteModel: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", noteSchema);
