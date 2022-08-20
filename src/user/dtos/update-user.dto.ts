import {IsEmail, IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    passwordConfirm: string;

    @IsOptional()
    @IsString()
    password: string;
}
