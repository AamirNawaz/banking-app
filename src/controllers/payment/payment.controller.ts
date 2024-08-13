import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';
import { CreatePaymentDto } from '../../dto/payment/create-payment.dto';
import { Payment } from '../../entities/Payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(
    @Req() req,
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const userId = req.user.sub;
    return this.paymentService.create(userId, createPaymentDto);
  }

  @Get()
  findAll(@Req() req): Promise<Payment[]> {
    const userId = req.user.sub;
    return this.paymentService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req): Promise<Payment> {
    const userId = req.user.sub;
    return this.paymentService.findOne(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = req.user.sub;
    return this.paymentService.remove(id, userId);
  }
}
