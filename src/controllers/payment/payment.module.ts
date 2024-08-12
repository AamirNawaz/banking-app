import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/Payment.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { PaymentController } from './payment.controller';
import { Booking } from 'src/entities/Booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Booking])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
