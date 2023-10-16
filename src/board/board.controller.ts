import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    findAllBoards(): Promise<Board[]> {
        return this.boardService.findAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    findBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.findBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: number): void {
        this.boardService.deleteBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatusById(
        @Param('id') id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardService.updateBoardStatusById(id, status);
    }
}
