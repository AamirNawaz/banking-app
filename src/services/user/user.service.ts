import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { LoginUserResponseDto } from 'src/dto/user/login-user-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({
        email: loginUserDto.email as string,
      });
      if (user?.password !== loginUserDto.password) {
        throw new UnauthorizedException();
      }

      const tokenResponseDtoObj = new LoginUserResponseDto();
      const payload = { sub: user.user_id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload);
      tokenResponseDtoObj.token = accessToken;
      return tokenResponseDtoObj;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'bookings', 'appNotification', 'qrCodes'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role', 'bookings', 'appNotification', 'qrCodes'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role', 'bookings', 'appNotification', 'qrCodes'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, user);
    return this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role', 'bookings', 'appNotification', 'qrCodes'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
