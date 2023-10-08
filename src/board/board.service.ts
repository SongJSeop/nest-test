import { Injectable } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import { v1 as uuid } from "uuid";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const newBoard: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    };

    this.boards.push(newBoard);
    return newBoard;
  }
}
