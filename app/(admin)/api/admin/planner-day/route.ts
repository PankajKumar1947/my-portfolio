import { apiHandler } from "@/lib/api-handler";
import * as plannerDayService from "@/services/planner-day.service";
import { NextResponse } from "next/server";
import { plannerDaySchema } from "@/validations/planner-day.schema";

export const GET = apiHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  const dayData = await plannerDayService.getDayDataService(date);
  return NextResponse.json(dayData);
});

export const PATCH = apiHandler(async (req) => {
  const body = await req.json();
  const validatedData = plannerDaySchema.parse(body);
  const plannerDay = await plannerDayService.appendRemarkService(validatedData);
  return NextResponse.json(plannerDay);
});
