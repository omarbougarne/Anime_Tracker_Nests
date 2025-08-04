import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/common/types/api-response.type';
import { UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<ApiResponse<UserDocument[]>> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ApiResponse<UserDocument>> {
        return this.userService.findById(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserDocument>> {
        return this.userService.create(createUserDto);
    }
}
