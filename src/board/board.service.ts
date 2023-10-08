import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

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
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(newBoard);
        return newBoard;
    }

    findBoardById(id: string): Board {
        const foundBoard = this.boards.find((board) => board.id === id);

        if (!foundBoard) {
            throw new NotFoundException(`Can't Find Board With id ${id}`);
        }

        return foundBoard;
    }

    deleteBoardById(id: string): void {
        const foundBoard = this.findBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
    }
}
