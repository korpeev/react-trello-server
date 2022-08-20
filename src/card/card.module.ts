import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import {PrismaService} from "../prisma/prisma.service";
import {JwtStrategy} from "../strategies";

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService, JwtStrategy]
})
export class CardModule {}
