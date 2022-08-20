import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateCardDto} from "./dtos";

@Injectable()
export class CardService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async create(createCardDto: CreateCardDto) {
        const sameCard = await this.prismaService.card.findUnique({
            where: {title: createCardDto.title}
        })
        if (sameCard) {
            throw new BadRequestException('Card with this title already exists')
        }
        return this.prismaService.card.create({
            data: {
                ...createCardDto,
            },
            include: {
                board: true,
            }
        })
    }

    async delete(id: number) {
        return this.prismaService.card.delete({
            where: {id}
        })
    }
}
