import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookingService } from 'src/services/booking/booking.service';
import { CreateBookingDto } from 'src/dto/booking/create-booking.dto';
import { UpdateBookingDto } from 'src/dto/booking/update-booking.dto';
import { Booking } from 'src/entities/Booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // @Post()
  // create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
  //   return this.bookingService.create(createBookingDto);
  // }

  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.findOne(id);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateBookingDto: UpdateBookingDto,
  // ): Promise<Booking> {
  //   return this.bookingService.update(id, updateBookingDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.bookingService.remove(id);
  }
}
