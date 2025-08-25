import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Partial<UserRepository>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    userRepository = {
      findByUserName: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: userRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    (userRepository.findByUserName as jest.Mock).mockResolvedValue(null);
    (userRepository.create as jest.Mock).mockResolvedValue({
      _id: 'user-id',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'hashed',
      isVerified: false,
    });

    const result = await service.register({
      userName: 'testuser',
      password: 'Password123!',
      email: 'test@example.com',
    });

    expect(result.success).toBe(true);
    expect(result.data?.access_token).toBe('mocked-jwt-token');
    expect(result.data?.user.userName).toBe('testuser');
  });

  it('should not register if username exists', async () => {
    (userRepository.findByUserName as jest.Mock).mockResolvedValue({ userName: 'testuser' });

    const result = await service.register({
      userName: 'testuser',
      password: 'Password123!',
      email: 'test@example.com',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Username already exists');
  });


});
