import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppNotificationService } from '../../services/notification/appNotification.service';
import { CreateNotificationDto } from '../../dto/notification/create-notification.dto';
import { UpdateNotificationDto } from '../../dto/notification/update-notification.dto';
import { AppNotification } from '../../entities/AppNotification.entity';
import { UserGuard } from 'src/guard/user.guard';

@Controller('notifications')
export class AppNotificationController {
  constructor(private readonly notificationService: AppNotificationService) {}

  @Post()
  @UseGuards(UserGuard)
  create(
    @Req() req,
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<AppNotification> {
    const userId = req.user.sub;
    return this.notificationService.create(userId, createNotificationDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll(@Req() req): Promise<AppNotification[]> {
    const userId = req.user.sub;
    return this.notificationService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: number, @Req() req): Promise<AppNotification> {
    const userId = req.user.sub;
    return this.notificationService.findOne(id, userId);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  update(
    @Param('id') id: number,
    @Req() req,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<AppNotification> {
    const userId = req.user.sub;
    return this.notificationService.update(id, userId, updateNotificationDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  remove(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = req.user.sub;
    return this.notificationService.remove(id, userId);
  }
}
