import * as plannerDayRepo from "@/repositories/planner-day.repository";
import * as todoService from "./todo.service";
import { IPlannerDay, UpsertPlannerDayDTO, IDayData } from "@/types/planner-day.types";

export const appendRemarkService = async (data: UpsertPlannerDayDTO): Promise<IPlannerDay> => {
  return plannerDayRepo.appendRemark(data);
};

export const getPlannerDayByDateService = async (date: string): Promise<IPlannerDay | null> => {
  return plannerDayRepo.getPlannerDayByDate(date);
};

export const getDayDataService = async (date: string): Promise<IDayData> => {
  const [plannerDay, todos] = await Promise.all([
    plannerDayRepo.getPlannerDayByDate(date),
    todoService.getTodosByDateService(date),
  ]);

  return {
    plannerDay: plannerDay || ({ date, remarks: [] } as IPlannerDay),
    todos,
  };
};
