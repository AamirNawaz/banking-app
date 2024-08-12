import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review.entity';
import { ReviewService } from 'src/services/review/review.service';
import { ReviewController } from './review.controller';
import { Booking } from 'src/entities/Booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Booking])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
