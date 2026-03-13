import { apiHandler } from "@/lib/api-handler";
import * as todoService from "@/services/todo.service";
import { NextResponse } from "next/server";

export const PATCH = apiHandler(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();
  
  const todo = await todoService.updateTodoService(id, body);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
});

export const DELETE = apiHandler(async (req, { params }) => {
  const { id } = await params;

  const todo = await todoService.deleteTodoService(id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Todo deleted" });
});
