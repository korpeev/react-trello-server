import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    color?: string

    @IsNumber()
    @IsNotEmpty()
    workspaceId: number;
}
