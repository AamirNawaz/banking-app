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
import { BookingService } from 'src/services/booking/booking.service';
import { CreateBookingDto } from 'src/dto/booking/create-booking.dto';
import { UpdateBookingDto } from 'src/dto/booking/update-booking.dto';
import { Booking } from 'src/entities/Booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req,
  ): Promise<Booking> {
    const userId = req.user.sub;
    return this.bookingService.create(userId, createBookingDto);
  }

  @Get()
  findAll(@Req() req): Promise<Booking[]> {
    const userId = req.user.sub;
    return this.bookingService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req): Promise<Booking> {
    const userId = req.user.sub;
    return this.bookingService.findOne(id, userId);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() req,
  ): Promise<Booking> {
    const userId = req.user.sub;
    return this.bookingService.update(id, userId, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = req.user.sub;
    return this.bookingService.remove(id, userId);
  }
}
