import { NextResponse } from "next/server";
import { BoardService } from "@/services/board.service";

const boardService = new BoardService();

export async function GET() {
  try {
    const boards = await boardService.getBoards();
    return NextResponse.json(boards);
  } catch (error) {
    console.error("GET /api/admin/boards error:", error);
    return NextResponse.json({ error: "Failed to fetch boards" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const board = await boardService.createBoard(body);
    return NextResponse.json(board);
  } catch (error) {
    console.error("POST /api/admin/boards error:", error);
    return NextResponse.json({ error: "Failed to create board" }, { status: 500 });
  }
}
