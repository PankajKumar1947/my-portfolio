import { PlannerDayModel } from "@/models/planner-day.model";
import { IPlannerDay, UpsertPlannerDayDTO } from "@/types/planner-day.types";

export const appendRemark = async (data: UpsertPlannerDayDTO): Promise<IPlannerDay> => {
  const plannerDay = await PlannerDayModel.findOneAndUpdate(
    { date: data.date },
    { 
      $push: { remarks: { text: data.remark } } 
    },
    { returnDocument: "after", upsert: true }
  ).lean();
  return plannerDay as IPlannerDay;
};

export const getPlannerDayByDate = async (date: string): Promise<IPlannerDay | null> => {
  const plannerDay = await PlannerDayModel.findOne({ date }).lean();
  return plannerDay as IPlannerDay | null;
};
