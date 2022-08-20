import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    color?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    boardId: number;
}
