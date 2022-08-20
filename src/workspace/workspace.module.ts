import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import {JwtStrategy} from "../strategies";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, JwtStrategy, PrismaService]
})
export class WorkspaceModule {}
