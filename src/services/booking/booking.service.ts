import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';
import { CreateBookingDto } from '../../dto/booking/create-booking.dto';
import { UpdateBookingDto } from '../../dto/booking/update-booking.dto';
import { User } from '../../entities/User.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      user: user,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.bookingRepository.save(booking);
  }

  async findAll(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user: { user_id: userId } },
      relations: ['user', 'reviews', 'payments'],
    });
  }

  async findOne(id: number, userId: number): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { booking_id: id, user: { user_id: userId } },
      relations: ['user', 'reviews', 'payments'],
    });
  }

  async update(
    id: number,
    userId: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const bookingToUpdate = await this.bookingRepository.findOne({
      where: { booking_id: id, user: { user_id: userId } },
    });

    if (!bookingToUpdate) {
      throw new NotFoundException('Booking not found');
    }

    if (updateBookingDto.user) {
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      bookingToUpdate.user = user;
    }

    if (updateBookingDto.service) {
      bookingToUpdate.service = updateBookingDto.service;
    }

    if (updateBookingDto.status) {
      bookingToUpdate.status = updateBookingDto.status;
    }

    if (updateBookingDto.created_at) {
      bookingToUpdate.created_at = updateBookingDto.created_at;
    }

    if (updateBookingDto.updated_at) {
      bookingToUpdate.updated_at = updateBookingDto.updated_at;
    }

    return this.bookingRepository.save(bookingToUpdate);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.bookingRepository.delete({
      booking_id: id,
      user: { user_id: userId },
    });
  }
}
