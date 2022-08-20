import {Body, Controller, Delete, ParseIntPipe, Post, Param, UseGuards, Patch, Get} from '@nestjs/common';
import { BoardService } from './board.service';
import {JwtAuthGuard} from "../guards";
import {GetCurrentUser} from "../decorators";
import {CreateBoardDto, UpdateBoardDto} from "./dtos";

@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
    async create(@Body() createBoardDto: CreateBoardDto, @GetCurrentUser('id') id: number) {
    return await this.boardService.create(createBoardDto, id)
  }
  @Get()
  async getAll() {
    return await this.boardService.getAll()
  }
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.boardService.delete(id)
  }

  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return await this.boardService.update(id, updateBoardDto)
  }
}
