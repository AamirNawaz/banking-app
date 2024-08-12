import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppNotificationService } from '../../services/notification/appNotification.service';
import { CreateNotificationDto } from '../../dto/notification/create-notification.dto';
import { UpdateNotificationDto } from '../../dto/notification/update-notification.dto';
import { AppNotification } from '../../entities/AppNotification.entity';

@Controller('notifications')
export class AppNotificationController {
  constructor(private readonly notificationService: AppNotificationService) {}

  @Post()
  create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<AppNotification> {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(): Promise<AppNotification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AppNotification> {
    return this.notificationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<AppNotification> {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.notificationService.remove(id);
  }
}
