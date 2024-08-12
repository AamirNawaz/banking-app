import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.paymentService.remove(id);
  }
}
