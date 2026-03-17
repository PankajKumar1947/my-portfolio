import { IPlannerDay } from "@/types/planner-day.types";
import mongoose, { Model, Schema } from "mongoose";

const remarkSchema = new Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } // Sub-documents in arrays often don't need their own _id
);

const schema = new Schema<IPlannerDay>(
  {
    date: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    remarks: [remarkSchema],
  },
  { timestamps: true }
);

// Prevent model overwrite on HMR
if (mongoose.models.DailyRemarks) delete mongoose.models.DailyRemarks;
export const PlannerDayModel: Model<IPlannerDay> =
  mongoose.models.DailyRemarks || mongoose.model<IPlannerDay>("DailyRemarks", schema);
