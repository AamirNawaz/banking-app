import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { Review } from '../../entities/review.entity';
import { Booking } from '../../entities/Booking.entity';
import { Repository, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/review/create-review.dto';
import { UpdateReviewDto } from 'src/dto/review/update-review.dto';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: Repository<Review>;
  let bookingRepository: Repository<Booking>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Booking),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const createReviewDto: CreateReviewDto = {
        booking: 1,
        rating: 5,
        review: 'Excellent',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const booking = { booking_id: 1 } as Booking;
      const review = { ...createReviewDto, booking } as Review;

      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(booking);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(review);

      expect(await service.create(createReviewDto)).toEqual(review);
    });

    it('should throw NotFoundException if booking is not found', async () => {
      const createReviewDto: CreateReviewDto = {
        booking: 1,
        rating: 5,
        review: 'Excellent',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createReviewDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of reviews', async () => {
      const reviews: Review[] = [
        {
          review_id: 1,
          booking: { booking_id: 1 } as Booking,
          rating: 5,
          review: 'Excellent',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(reviewRepository, 'find').mockResolvedValue(reviews);

      expect(await service.findAll()).toEqual(reviews);
    });
  });

  describe('findOne', () => {
    it('should return a single review', async () => {
      const review: Review = {
        review_id: 1,
        booking: { booking_id: 1 } as Booking,
        rating: 5,
        review: 'Excellent',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(review);

      expect(await service.findOne(1)).toEqual(review);
    });

    it('should throw NotFoundException if review is not found', async () => {
      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the review', async () => {
      const existingReview: Review = {
        review_id: 1,
        booking: { booking_id: 1 } as Booking,
        rating: 3,
        review: 'Good',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const updateReviewDto: UpdateReviewDto = {
        rating: 5,
        review: 'Excellent',
        booking: 1,
      };
      const booking = { booking_id: 1 } as Booking;
      const updatedReview = {
        ...existingReview,
        ...updateReviewDto,
        booking,
      } as Review;

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(existingReview);
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(booking);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(updatedReview);

      expect(await service.update(1, updateReviewDto)).toEqual(updatedReview);
    });

    it('should throw NotFoundException if review to update is not found', async () => {
      const updateReviewDto: UpdateReviewDto = {
        rating: 5,
        review: 'Excellent',
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateReviewDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if booking to update is not found', async () => {
      const existingReview: Review = {
        review_id: 1,
        booking: { booking_id: 1 } as Booking,
        rating: 3,
        review: 'Good',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const updateReviewDto: UpdateReviewDto = {
        booking: 2,
      };

      jest.spyOn(reviewRepository, 'findOne').mockResolvedValue(existingReview);
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateReviewDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the review', async () => {
      jest
        .spyOn(reviewRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      await service.remove(1);

      expect(reviewRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if review to delete is not found', async () => {
      jest
        .spyOn(reviewRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
