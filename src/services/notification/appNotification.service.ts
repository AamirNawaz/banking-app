import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../entities/AppNotification.entity';
import { CreateNotificationDto } from '../../dto/notification/create-notification.dto';
import { UpdateNotificationDto } from '../../dto/notification/update-notification.dto';
import { User } from '../../entities/User.entity';

@Injectable()
export class AppNotificationService {
  constructor(
    @InjectRepository(AppNotification)
    private readonly notificationRepository: Repository<AppNotification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<AppNotification> {
    const user = await this.userRepository.findOne({
      where: { user_id: createNotificationDto.user },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user: user,
    });

    return this.notificationRepository.save(notification);
  }

  async findAll(): Promise<AppNotification[]> {
    return this.notificationRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<AppNotification> {
    const notification = await this.notificationRepository.findOne({
      where: { notification_id: id },
      relations: ['user'],
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<AppNotification> {
    const notificationToUpdate = await this.notificationRepository.findOne({
      where: { notification_id: id },
    });

    if (!notificationToUpdate) {
      throw new NotFoundException('Notification not found');
    }

    if (updateNotificationDto.user) {
      const user = await this.userRepository.findOne({
        where: { user_id: updateNotificationDto.user },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      notificationToUpdate.user = user;
    }

    if (updateNotificationDto.message) {
      notificationToUpdate.message = updateNotificationDto.message;
    }

    if (updateNotificationDto.type) {
      notificationToUpdate.type = updateNotificationDto.type;
    }

    if (updateNotificationDto.read_at) {
      notificationToUpdate.read_at = updateNotificationDto.read_at;
    }

    return this.notificationRepository.save(notificationToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Notification not found');
    }
  }
}
