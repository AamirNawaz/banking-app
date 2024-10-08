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
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email as string },
        relations: ['role'],
      });

      if (
        !user ||
        !(await bcrypt.compare(loginUserDto.password, user.password))
      ) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const tokenResponseDtoObj = new LoginUserResponseDto();
      const payload = {
        sub: user.user_id,
        email: user.email,
        role: user.role.name,
      };
      const accessToken = await this.jwtService.signAsync(payload);
      tokenResponseDtoObj.token = accessToken;
      return tokenResponseDtoObj;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(user: Partial<User>): Promise<User> {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
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
