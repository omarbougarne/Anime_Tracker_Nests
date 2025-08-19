import { IsString, IsNotEmpty } from "@nestjs/class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}