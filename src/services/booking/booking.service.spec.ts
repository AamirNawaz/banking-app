import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';
import { User } from '../../entities/User.entity';
import { NotFoundException } from '@nestjs/common';

describe('BookingService', () => {
  let service: BookingService;
  let bookingRepository: Repository<Booking>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking successfully', async () => {
      const createBookingDto = {
        user: 1,
        service: 'Test Service',
        status: 'Pending',
      };
      const user = { user_id: 1 } as User;
      const booking = { ...createBookingDto, user };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bookingRepository, 'create').mockReturnValue(booking as any);
      jest.spyOn(bookingRepository, 'save').mockResolvedValue(booking as any);

      expect(await service.create(createBookingDto)).toEqual(booking);
    });

    it('should throw NotFoundException if user is not found -v2', async () => {
      const createBookingDto = {
        user: 1,
        service: 'Test Service',
        status: 'Pending',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createBookingDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of bookings', async () => {
      const bookings = [{ booking_id: 1 }, { booking_id: 2 }];

      jest.spyOn(bookingRepository, 'find').mockResolvedValue(bookings as any);

      expect(await service.findAll()).toEqual(bookings);
    });
  });

  describe('findOne', () => {
    it('should return a single booking', async () => {
      const booking = { booking_id: 1 };

      jest
        .spyOn(bookingRepository, 'findOne')
        .mockResolvedValue(booking as any);

      expect(await service.findOne(1)).toEqual(booking);
    });
  });

  describe('update', () => {
    it('should update a booking successfully', async () => {
      const updateBookingDto = { user: 1, service: 'Updated Service' };
      const existingBooking = {
        booking_id: 1,
        user: { user_id: 1 },
        service: 'Old Service',
      };
      const updatedBooking = { ...existingBooking, ...updateBookingDto };

      jest
        .spyOn(bookingRepository, 'findOne')
        .mockResolvedValue(existingBooking as any);
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ user_id: 1 } as any);
      jest
        .spyOn(bookingRepository, 'save')
        .mockResolvedValue(updatedBooking as any);

      expect(await service.update(1, updateBookingDto)).toEqual(updatedBooking);
    });

    it('should throw NotFoundException if booking to update is not found ', async () => {
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      const updateBookingDto = { user: 1 };
      const existingBooking = { booking_id: 1 };

      jest
        .spyOn(bookingRepository, 'findOne')
        .mockResolvedValue(existingBooking as any);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateBookingDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove a booking', async () => {
      jest
        .spyOn(bookingRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should handle case where booking is not found', async () => {
      jest
        .spyOn(bookingRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).resolves.not.toThrow();
    });
  });
});
