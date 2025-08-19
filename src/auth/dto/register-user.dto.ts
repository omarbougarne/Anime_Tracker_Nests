import { IsString, IsNotEmpty, IsEmail } from "@nestjs/class-validator";

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
