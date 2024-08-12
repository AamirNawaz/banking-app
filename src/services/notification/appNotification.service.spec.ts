import { Test, TestingModule } from '@nestjs/testing';
import { AppNotificationService } from './appNotification.service';
import { AppNotification } from '../../entities/AppNotification.entity';
import { User } from '../../entities/User.entity';
import { Repository, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from '../../dto/notification/create-notification.dto';
import { UpdateNotificationDto } from '../../dto/notification/update-notification.dto';

describe('AppNotificationService', () => {
  let service: AppNotificationService;
  let notificationRepository: Repository<AppNotification>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppNotificationService,
        {
          provide: getRepositoryToken(AppNotification),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AppNotificationService>(AppNotificationService);
    notificationRepository = module.get<Repository<AppNotification>>(
      getRepositoryToken(AppNotification),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new notification', async () => {
      const createNotificationDto: CreateNotificationDto = {
        user: 1,
        message: 'Test notification',
        type: 'Info',
        read_at: new Date(),
      };
      const user = { user_id: 1 } as User;
      const notification = {
        ...createNotificationDto,
        user,
      } as AppNotification;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(notificationRepository, 'create')
        .mockReturnValue(notification);
      jest
        .spyOn(notificationRepository, 'save')
        .mockResolvedValue(notification);

      expect(await service.create(createNotificationDto)).toEqual(notification);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createNotificationDto: CreateNotificationDto = {
        user: 1,
        message: 'Test notification',
        type: 'Info',
        read_at: new Date(),
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createNotificationDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of notifications', async () => {
      const notifications: AppNotification[] = [
        {
          notification_id: 1,
          user: { user_id: 1 } as User,
          message: 'Test notification',
          type: 'Info',
          created_at: new Date(),
          read_at: new Date(),
        },
      ];

      jest
        .spyOn(notificationRepository, 'find')
        .mockResolvedValue(notifications);

      expect(await service.findAll()).toEqual(notifications);
    });
  });

  describe('findOne', () => {
    it('should return a single notification', async () => {
      const notification: AppNotification = {
        notification_id: 1,
        user: { user_id: 1 } as User,
        message: 'Test notification',
        type: 'Info',
        created_at: new Date(),
        read_at: new Date(),
      };

      jest
        .spyOn(notificationRepository, 'findOne')
        .mockResolvedValue(notification);

      expect(await service.findOne(1)).toEqual(notification);
    });

    it('should throw NotFoundException if notification is not found', async () => {
      jest.spyOn(notificationRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the notification', async () => {
      const existingNotification: AppNotification = {
        notification_id: 1,
        user: { user_id: 1 } as User,
        message: 'Old message',
        type: 'Info',
        created_at: new Date(),
        read_at: new Date(),
      };
      const updateNotificationDto: UpdateNotificationDto = {
        message: 'Updated message',
        type: 'Alert',
        read_at: new Date(),
        user: 1,
      };
      const user = { user_id: 1 } as User;
      const updatedNotification = {
        ...existingNotification,
        ...updateNotificationDto,
        user,
      } as AppNotification;

      jest
        .spyOn(notificationRepository, 'findOne')
        .mockResolvedValue(existingNotification);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(notificationRepository, 'save')
        .mockResolvedValue(updatedNotification);

      expect(await service.update(1, updateNotificationDto)).toEqual(
        updatedNotification,
      );
    });

    it('should throw NotFoundException if notification to update is not found', async () => {
      const updateNotificationDto: UpdateNotificationDto = {
        message: 'Updated message',
      };

      jest.spyOn(notificationRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateNotificationDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      const existingNotification: AppNotification = {
        notification_id: 1,
        user: { user_id: 1 } as User,
        message: 'Old message',
        type: 'Info',
        created_at: new Date(),
        read_at: new Date(),
      };
      const updateNotificationDto: UpdateNotificationDto = {
        user: 2,
      };

      jest
        .spyOn(notificationRepository, 'findOne')
        .mockResolvedValue(existingNotification);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateNotificationDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the notification', async () => {
      jest
        .spyOn(notificationRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      await service.remove(1);

      expect(notificationRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if notification to delete is not found', async () => {
      jest
        .spyOn(notificationRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
