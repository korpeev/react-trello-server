import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../prisma/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../strategies";

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy]
})
export class UserModule {}
