import { BoardRepository } from "@/repositories/board.repository";
import { IBoard, IBoardMeta } from "@/types/board.types";

export class BoardService {
  private repository: BoardRepository;

  constructor() {
    this.repository = new BoardRepository();
  }

  async getBoards(): Promise<IBoardMeta[]> {
    return await this.repository.findAll();
  }

  async getBoardById(id: string): Promise<IBoard | null> {
    return await this.repository.findById(id);
  }

  async createBoard(data: Partial<IBoard>): Promise<IBoard> {
    return await this.repository.create(data);
  }

  async updateBoard(id: string, data: Partial<IBoard>): Promise<IBoard | null> {
    return await this.repository.update(id, data);
  }

  async deleteBoard(id: string): Promise<IBoard | null> {
    return await this.repository.delete(id);
  }
}
