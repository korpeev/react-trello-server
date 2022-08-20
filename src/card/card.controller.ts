import {Body, Controller, Post} from '@nestjs/common';
import { CardService } from './card.service';
import {CreateCardDto} from "./dtos";

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/create')
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }
}
