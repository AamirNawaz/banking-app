import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from 'src/entities/payment.entity';
import { CreatePaymentDto } from 'src/dto/payment/create-payment.dto';
import { Booking } from 'src/entities/Booking.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id: createPaymentDto.booking },
    });

    if (!booking) {
      throw new NotFoundException(
        `Booking with ID ${createPaymentDto.booking} not found`,
      );
    }
    const payment = new Payment();
    payment.booking = booking;
    payment.payment_method = createPaymentDto.payment_method;
    payment.amount = createPaymentDto.amount;
    payment.status = createPaymentDto.status;
    payment.created_at = createPaymentDto.created_at;
    payment.updated_at = createPaymentDto.updated_at;

    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['booking'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id: id },
      relations: ['booking'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
