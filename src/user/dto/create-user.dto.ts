import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    userName: string;
}