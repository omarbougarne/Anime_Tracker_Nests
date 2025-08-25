import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiResponse } from 'src/common/types/api-response.type';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterUserDto): ApiResponse<{ access_token, user: any }> {
        try {
            const existingUser = await this.userRepository.findByUserName(registerDto.userName)
            if (existingUser) {
                return {
                    success: false,
                    message: 'Username already exists'
                };
            }

            const passwordHash = await bcrypt.hash(registerDto.password, 10)

            const newUser = await this.userRepository.create({
                userName: registerDto.userName,
                email: registerDto.email,
                password: passwordHash,
                isVerified: false
            });

            const payload = { sub: newUser._id, username: newUser.userName };
            const access_token = this.jwtService.sign(payload);
            return {
                success: true,
                data: { access_token, user: newUser },
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

    async login(loginDto: LoginUserDto): ApiResponse<{ access_token, user: any }> {
        try {
            const user = await this.userRepository.findByUserName(loginDto.userName);

            if (!user) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            const payload = { sub: user._id, username: user.userName };
            const access_token = this.jwtService.sign(payload);

            return {
                success: true,
                data: {
                    access_token,
                    user: {
                        _id: user._id,
                        userName: user.userName,
                        email: user.email,
                        isVerified: user.isVerified
                    }
                },
                message: 'Login successful'
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Login failed'
            }
        }
    }
}
