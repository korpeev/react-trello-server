import {Body, Controller, Param, ParseIntPipe, Patch, Post, Request, UseGuards,} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto, SignInDto, UpdateUserDto} from "./dtos";
import {JwtAuthGuard} from "../guards";
import {GetCurrentUser} from "../decorators";
import {JwtPayload} from "../types";
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('/signup')
  async signup(@Body() creatUserDto: CreateUserDto ) {
    return await this.userService.create(creatUserDto)
  }
  @Post('/signin')
  async signin(@Body() signInDto: SignInDto ) {
    return await this.userService.signin(signInDto)
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async update(@Body() updateUserDto: UpdateUserDto, @GetCurrentUser('sub') id: number) {
    return await this.userService.updateUser(updateUserDto, id)
  }
}
