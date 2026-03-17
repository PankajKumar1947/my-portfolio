import { BoardModel } from "@/models/board.model";
import { IBoard, IBoardMeta } from "@/types/board.types";

export const getBoards = async (): Promise<IBoardMeta[]> => {
  return await BoardModel.find({}, { scene: 0 }).sort({ createdAt: -1 }).lean();
};

export const getBoardById = async (id: string): Promise<IBoard | null> => {
  return await BoardModel.findById(id).lean();
};

export const createBoard = async (data: Partial<IBoard>): Promise<IBoard> => {
  const board = new BoardModel(data);
  return await board.save();
};

export const updateBoard = async (id: string, data: Partial<IBoard>): Promise<IBoard | null> => {
  return await BoardModel.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const deleteBoard = async (id: string): Promise<IBoard | null> => {
  return await BoardModel.findByIdAndDelete(id).lean();
};
