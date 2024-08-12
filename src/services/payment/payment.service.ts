import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['booking'] });
  }

  async findOne(id: number): Promise<Payment> {
    return this.paymentRepository.findOne({
      where: { payment_id: id },
      relations: ['booking'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
