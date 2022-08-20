import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateWorkspaceDto} from "./dtos";

@Injectable()
export class WorkspaceService {
    constructor(private readonly prismService: PrismaService) {
    }
    async getAll() {
        return await this.prismService.workspace.findMany({
            include: {
                boards: true,
            }
        });
    }

    async getOne(id: number) {
        return await this.prismService.workspace.findUnique({
            where: {
                id: id
            },
            include: {boards: true}
        });
    }

    async create(createWorkspaceDto: CreateWorkspaceDto, userId: number) {
        const sameWorkspace = await this.prismService.workspace.findUnique({where: {title: createWorkspaceDto.title}});
        if (sameWorkspace) {
            throw new Error('Workspace with this title already exists');
        }
        return await this.prismService.workspace.create({
            data: {
                title: createWorkspaceDto.title,
                userId,
            },
            include: {
                boards: true,
            }
        })
    }
    async delete(id: number) {
        return await this.prismService.workspace.delete({
            where: {
                id: id
            },
            include: {
                boards: true,
            }
        });
    }

    async update(id: number, title: string) {
        return await this.prismService.workspace.update({
            where: {
                id: id
            },
            data: {
                title,
            },
            include: {
                boards: true,
            }
        });
    }
}
