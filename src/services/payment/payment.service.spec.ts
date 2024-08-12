import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../services/payment/payment.service';
import { Payment } from '../../entities/payment.entity';
import { Booking } from '../../entities/Booking.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from 'src/dto/payment/create-payment.dto';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<Payment>;
  let bookingRepository: Repository<Booking>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Booking),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<Payment>>(
      getRepositoryToken(Payment),
    );
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        booking: 1,
        payment_method: 'Credit Card',
        amount: 100,
        status: 'Completed',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const booking = { booking_id: 1 } as Booking;
      const payment = { ...createPaymentDto, booking } as Payment;

      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(booking);
      jest.spyOn(paymentRepository, 'save').mockResolvedValue(payment);

      expect(await service.create(createPaymentDto)).toEqual(payment);
    });

    it('should throw NotFoundException if booking is not found', async () => {
      const createPaymentDto: CreatePaymentDto = {
        booking: 1,
        payment_method: 'Credit Card',
        amount: 100,
        status: 'Completed',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createPaymentDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const payments: Payment[] = [
        {
          payment_id: 1,
          booking: { booking_id: 1 } as Booking,
          payment_method: 'Credit Card',
          amount: 100,
          status: 'Completed',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(paymentRepository, 'find').mockResolvedValue(payments);

      expect(await service.findAll()).toEqual(payments);
    });
  });

  describe('findOne', () => {
    it('should return a single payment', async () => {
      const payment: Payment = {
        payment_id: 1,
        booking: { booking_id: 1 } as Booking,
        payment_method: 'Credit Card',
        amount: 100,
        status: 'Completed',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(payment);

      expect(await service.findOne(1)).toEqual(payment);
    });

    it('should throw NotFoundException if payment is not found', async () => {
      jest.spyOn(paymentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete the payment', async () => {
      jest
        .spyOn(paymentRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      await service.remove(1);

      expect(paymentRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if payment to delete is not found', async () => {
      jest
        .spyOn(paymentRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
