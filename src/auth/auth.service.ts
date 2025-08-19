import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiResponse } from 'src/common/types/api-response.type';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async register(registerUserDto: RegisterUserDto): ApiResponse<{ access_token, newUser: any }> {
        try {
            const existingUser = await this.userRepository.findByUserName(registerUserDto.userName)
            if (existingUser) {
                return {
                    success: false,
                    message: 'User Name Already Exists'
                };
            }

            const passwordHash = await bcrypt.hash(registerUserDto.password, 10)

            const newUser = await this.userRepository.create({
                userName: registerUserDto.userName,
                email: registerUserDto.email,
                password: passwordHash,
                isVerified: false
            });

            const payload = { sub: newUser._id, username: newUser.userName };
            const access_token = this.jwtService.sign(payload);
            return {
                success: true,
                data: { access_token, newUser },
                message: 'User registered successfully'
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Registration Failed'
            }
        }
    }
}
