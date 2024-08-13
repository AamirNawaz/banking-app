import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { User } from 'src/entities/User.entity';
import { Roles } from 'src/guard/roles.decorator';
import { UserGuard } from 'src/guard/user.guard';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @Roles('admin')
  @UseGuards(UserGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  async findOne(@Param('id') id: number, @Req() req): Promise<User> {
    const userIdFromToken = req.user.sub;
    if (id !== userIdFromToken) {
      throw new UnauthorizedException(
        'You are not authorized to access this user',
      );
    }
    return this.userService.findOne(userIdFromToken);
  }

  @Put()
  @UseGuards(UserGuard)
  async update(@Body() user: Partial<User>, @Req() req): Promise<User> {
    const userId = req.user.sub;
    return this.userService.update(userId, user);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = req.user.sub;
    return this.userService.remove(userId);
  }
}
