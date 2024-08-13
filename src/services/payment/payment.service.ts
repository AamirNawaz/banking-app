import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { CreatePaymentDto } from 'src/dto/payment/create-payment.dto';
import { Booking } from '../../entities/Booking.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(
    userId: number,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const booking = await this.bookingRepository.findOne({
      where: {
        booking_id: createPaymentDto.booking,
        user: { user_id: userId },
      },
    });

    if (!booking) {
      throw new NotFoundException(
        `Booking with ID ${createPaymentDto.booking} not found`,
      );
    }
    const payment = new Payment();
    payment.booking = booking;
    payment.payment_method = createPaymentDto.payment_method;
    // payment.user = creat
    payment.amount = createPaymentDto.amount;
    payment.status = createPaymentDto.status;
    payment.created_at = createPaymentDto.created_at;
    payment.updated_at = createPaymentDto.updated_at;

    return this.paymentRepository.save(payment);
  }

  async findAll(userId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { user: { user_id: userId } },
      relations: ['booking'],
    });
  }

  async findOne(id: number, userId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id: id, user: { user_id: userId } },
      relations: ['booking'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.paymentRepository.delete({
      payment_id: id,
      user: { user_id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
