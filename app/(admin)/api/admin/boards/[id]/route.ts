import { NextResponse } from "next/server";
import { BoardService } from "@/services/board.service";

const boardService = new BoardService();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const board = await boardService.getBoardById(id);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json(board);
  } catch (error) {
    console.error(`GET /api/admin/boards/${(await params).id} error:`, error);
    return NextResponse.json({ error: "Failed to fetch board" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const board = await boardService.updateBoard(id, body);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json(board);
  } catch (error) {
    console.error(`PATCH /api/admin/boards/${(await params).id} error:`, error);
    return NextResponse.json({ error: "Failed to update board" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const board = await boardService.deleteBoard(id);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/admin/boards/${(await params).id} error:`, error);
    return NextResponse.json({ error: "Failed to delete board" }, { status: 500 });
  }
}
