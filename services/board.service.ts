import * as boardRepo from "@/repositories/board.repository";
import { IBoard, IBoardMeta } from "@/types/board.types";

export const getBoardsService = async (): Promise<IBoardMeta[]> => {
  return await boardRepo.getBoards();
};

export const getBoardByIdService = async (id: string): Promise<IBoard | null> => {
  return await boardRepo.getBoardById(id);
};

export const createBoardService = async (data: Partial<IBoard>): Promise<IBoard> => {
  return await boardRepo.createBoard(data);
};

export const updateBoardService = async (id: string, data: Partial<IBoard>): Promise<IBoard | null> => {
  return await boardRepo.updateBoard(id, data);
};

export const deleteBoardService = async (id: string): Promise<IBoard | null> => {
  return await boardRepo.deleteBoard(id);
};
