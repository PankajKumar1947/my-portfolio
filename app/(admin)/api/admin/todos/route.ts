import { apiHandler } from "@/lib/api-handler";
import * as todoService from "@/services/todo.service";
import { NextResponse } from "next/server";

export const GET = apiHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const month = searchParams.get("month"); 
  
  if (date) {
    const todos = await todoService.getTodosByDateService(date);
    return NextResponse.json(todos);
  } else if (month) {
    const todos = await todoService.getTodosByMonthService(month);
    return NextResponse.json(todos);
  }

  return NextResponse.json([], { status: 400 });
});

export const POST = apiHandler(async (req) => {
  const body = await req.json();
  const todo = await todoService.createTodoService(body);
  return NextResponse.json(todo, { status: 201 });
});
