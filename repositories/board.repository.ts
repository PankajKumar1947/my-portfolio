import { BoardModel } from "@/models/board.model";
import { IBoard, IBoardMeta } from "@/types/board.types";

export class BoardRepository {
  async findAll(): Promise<IBoardMeta[]> {
    return await BoardModel.find({}, { scene: 0 }).sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<IBoard | null> {
    return await BoardModel.findById(id).lean();
  }

  async create(data: Partial<IBoard>): Promise<IBoard> {
    const board = new BoardModel(data);
    return await board.save();
  }

  async update(id: string, data: Partial<IBoard>): Promise<IBoard | null> {
    return await BoardModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string): Promise<IBoard | null> {
    return await BoardModel.findByIdAndDelete(id).lean();
  }
}
