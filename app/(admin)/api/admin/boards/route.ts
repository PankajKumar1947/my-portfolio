import { NextResponse } from "next/server";
import * as boardService from "@/services/board.service";

export async function GET() {
  try {
    const boards = await boardService.getBoardsService();
    return NextResponse.json(boards);
  } catch (error) {
    console.error("GET /api/admin/boards error:", error);
    return NextResponse.json({ error: "Failed to fetch boards" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const board = await boardService.createBoardService(body);
    return NextResponse.json(board);
  } catch (error) {
    console.error("POST /api/admin/boards error:", error);
    return NextResponse.json({ error: "Failed to create board" }, { status: 500 });
  }
}
