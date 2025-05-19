import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { ApiResponse } from 'src/common/types/api-response.type';
import { UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll(): ApiResponse<UserDocument[]> {
        try {
            const users = await this.userRepository.findAll();
            return {
                success: true,
                data: users,
                message: 'Users retrieved successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to retrieve users'
            };
        }
    }

    async findById(id: string): ApiResponse<UserDocument> {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                return {
                    success: false,
                    message: `User with ${id} not found`
                };
            }
            return {
                success: true,
                data: user,
                message: 'User retrieved successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to retrieve user'
            };
        }
    }

    async create(createUserDto: CreateUserDto): ApiResponse<UserDocument> {
        try {
            const existingUser = await this.userRepository.findByUserName(createUserDto.userName);
            if (existingUser) {
                return {
                    success: false,
                    message: 'User with this username already exists'
                };
            }

            const newUser = await this.userRepository.create(createUserDto);

            return {
                success: true,
                data: newUser,
                message: 'User created successfully'
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create user'
            };
        }
    }

}
