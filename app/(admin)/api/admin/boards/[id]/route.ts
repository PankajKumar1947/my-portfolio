import { NextResponse } from "next/server";
import * as boardService from "@/services/board.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const board = await boardService.getBoardByIdService(id);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json(board);
  } catch (error) {
    console.error(`GET /api/admin/boards/${id} error:`, error);
    return NextResponse.json({ error: "Failed to fetch board" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const board = await boardService.updateBoardService(id, body);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json(board);
  } catch (error) {
    console.error(`PATCH /api/admin/boards/${id} error:`, error);
    return NextResponse.json({ error: "Failed to update board" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const board = await boardService.deleteBoardService(id);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/admin/boards/${id} error:`, error);
    return NextResponse.json({ error: "Failed to delete board" }, { status: 500 });
  }
}
