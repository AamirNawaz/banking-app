import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'bookings', 'notifications', 'qrCodes'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role', 'bookings', 'notifications', 'qrCodes'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role', 'bookings', 'notifications', 'qrCodes'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, user);
    return this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role', 'bookings', 'notifications', 'qrCodes'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
