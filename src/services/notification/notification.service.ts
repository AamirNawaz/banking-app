import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';
import { CreateNotificationDto } from '../../dto/notification/create-notification.dto';
import { UpdateNotificationDto } from '../../dto/notification/update-notification.dto';
import { User } from 'src/entities/User.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
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

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationRepository.findOne({
      where: { notification_id: id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
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
    await this.notificationRepository.delete(id);
  }
}
