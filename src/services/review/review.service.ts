import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { CreateReviewDto } from 'src/dto/review/create-review.dto';
import { UpdateReviewDto } from 'src/dto/review/update-review.dto';
import { Booking } from '../../entities/Booking.entity';
import { User } from 'src/entities/User.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id: createReviewDto.booking },
    });

    if (!booking) {
      throw new NotFoundException(
        `Booking with ID ${createReviewDto.booking} not found`,
      );
    }

    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const review = new Review();
    review.booking = booking;
    review.user = user;
    review.rating = createReviewDto.rating;
    review.review = createReviewDto.review;
    review.created_at = createReviewDto.created_at;
    review.updated_at = createReviewDto.updated_at;

    return this.reviewRepository.save(review);
  }

  async findAll(userId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { user: { user_id: userId } },
      relations: ['booking'],
    });
  }

  async findOne(id: number, userId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id, user: { user_id: userId } },
      relations: ['booking'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(
    id: number,
    userId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id, user: { user_id: userId } },
      relations: ['booking'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    if (updateReviewDto.booking) {
      const booking = await this.bookingRepository.findOne({
        where: {
          booking_id: updateReviewDto.booking,
          user: { user_id: userId },
        },
      });

      if (!booking) {
        throw new NotFoundException(
          `Booking with ID ${updateReviewDto.booking} not found`,
        );
      }
      review.booking = booking;
    }

    if (updateReviewDto.rating !== undefined) {
      review.rating = updateReviewDto.rating;
    }
    if (updateReviewDto.review !== undefined) {
      review.review = updateReviewDto.review;
    }
    if (updateReviewDto.created_at) {
      review.created_at = updateReviewDto.created_at;
    }
    if (updateReviewDto.updated_at) {
      review.updated_at = updateReviewDto.updated_at;
    }

    return this.reviewRepository.save(review);
  }

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.reviewRepository.delete({
      review_id: id,
      user: { user_id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
}
