import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/Booking.entity';
import { BookingService } from 'src/services/booking/booking.service';
import { BookingController } from './booking.controller';
import { UserModule } from '../user/user.module';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User])],
  providers: [BookingService],
  controllers: [BookingController],
  // exports: [BookingService],
})
export class BookingModule {}
