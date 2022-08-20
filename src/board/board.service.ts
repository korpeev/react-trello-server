import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateBoardDto, UpdateBoardDto} from "./dtos";

@Injectable()
export class BoardService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(createBoardDto: CreateBoardDto, userId: number) {
        const sameBoard = await this.prismaService.board.findUnique({where: {title: createBoardDto.title}});
        if (sameBoard) {
            throw new BadRequestException('Board with this title already exists');
        }
        return await this.prismaService.board.create({
            data: {
                title: createBoardDto.title,
                color: createBoardDto.color ?? '#ffffff',
                userId,
                workspaceId: createBoardDto.workspaceId
            },
            include: {
                workspace: true,
                cards: true
            }
        })
    }

    async delete(id: number) {
        return await this.prismaService.board.delete({
            where: {
                id: id
            },
            include: {
                workspace: true,
                cards: true
            }
        });
    }
    async getAll() {
        return await this.prismaService.board.findMany({
            include: {
                workspace: true,
                cards: true
            }
        });
    }
    async update(id: number, updateBoardDto: UpdateBoardDto) {
        const filteredUpdateBoardDto = Object.keys(updateBoardDto).reduce((acc, key) => {
            if (updateBoardDto[key]) {
                acc[key] = updateBoardDto[key];
            }
            return acc
        }, {} as UpdateBoardDto);
        return await this.prismaService.board.update({
            where: {
                id: id
            },
            data: {
                ...filteredUpdateBoardDto
            },
            include: {
                workspace: true,
                cards: true
            }
        })
    }
}
