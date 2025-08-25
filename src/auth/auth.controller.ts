import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiResponse as SwaggerResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterUserDto })
    @SwaggerResponse({ status: 201, description: 'User successfully registered' })
    @SwaggerResponse({ status: 400, description: 'Bad request' })
    async register(@Body() registerDto: RegisterUserDto) {
        return this.authService.register(registerDto)
    }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: RegisterUserDto })
    @SwaggerResponse({ status: 201, description: 'Login Succeful' })
    @SwaggerResponse({ status: 400, description: 'Invalid Credentials' })
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto)
    }




    // @Get('profile')
    // @ApiOperation({ summary: 'Get current user profile' })
    // @SwaggerResponse({ status: 200, description: 'Profile retrieved successfully' })
    // @SwaggerResponse({ status: 401, description: 'Unauthorized' })
    // async getProfile(@Request() req) {
    //     // req.user contains the decoded JWT payload
    //     return {
    //         success: true,
    //         data: req.user,
    //         message: 'User profile retrieved successfully'
    //     };
    // }
}
