import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {PrismaService} from "../prisma/prisma.service";
import {JwtStrategy} from "../strategies";

@Module({
  controllers: [BoardController],
  providers: [BoardService, PrismaService, JwtStrategy]
})
export class BoardModule {}
