import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import {JwtAuthGuard} from "../guards";
import {CreateWorkspaceDto} from "./dtos";
import {GetCurrentUser} from "../decorators";
@UseGuards(JwtAuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('/')
  async getAll() {
    return await this.workspaceService.getAll()
  }
  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.workspaceService.getOne(id)
  }
  @Post('/create')
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @GetCurrentUser('id') id: number) {
    return await this.workspaceService.create(createWorkspaceDto, id)
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.workspaceService.delete(id)
  }

  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() {title}: {title: string}) {
    return await this.workspaceService.update(id, title)
  }
}
