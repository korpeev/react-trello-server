import {IsOptional, IsString} from "class-validator";

export class UpdateBoardDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    color?: string
}
