import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator'
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @MinLength(4, {message: 'Password must be at least 4 characters long'})
    @MaxLength(20, {message: 'Password must be at most 20 characters long'})
    password: string;
}
