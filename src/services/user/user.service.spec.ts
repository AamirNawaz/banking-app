import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/User.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user: User = {
        user_id: 1,
        email: 'testuser@gmail.com',
      } as User;
      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      expect(await service.create(user)).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: Partial<User>[] = [
        { user_id: 1, email: 'testuser@gmail.com' } as User,
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users as User[]);

      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user: User = {
        user_id: 1,
        email: 'testuser@gmail.com',
      } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne(1)).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const existingUser: User = {
        user_id: 1,
        email: 'testuser@gmail.com',
      } as User;
      const updateUser: Partial<User> = { email: 'updateduser@gmail.com' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser);
      jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ ...existingUser, ...updateUser });

      expect(await service.update(1, updateUser)).toEqual({
        ...existingUser,
        ...updateUser,
      });
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, {} as Partial<User>)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the user', async () => {
      jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      await service.remove(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
