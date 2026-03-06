import { NextResponse } from "next/server";
import { connectDB } from "./db";

export class ApiError extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message);
    this.name = "ApiError";
  }
}

type HandlerContext = {
  params: Promise<any>;
};

type Handler = (req: Request, context: HandlerContext) => Promise<Response>;

export function apiHandler(handler: Handler) {
  return async (req: Request, context: HandlerContext) => {
    try {
      await connectDB();
      return await handler(req, context);
    } catch (error: unknown) {
      console.error("API Error:", error);

      if (error instanceof ApiError) {
        return NextResponse.json(
          { error: error.message },
          { status: error.status }
        );
      }

      const message = error instanceof Error ? error.message : "Internal Server Error";

      // Default error response
      return NextResponse.json(
        { error: message },
        { status: 500 }
      );
    }
  };
}
