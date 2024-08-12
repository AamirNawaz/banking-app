import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { User } from 'src/entities/User.entity';
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
  @UseGuards(UserGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  async update(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
