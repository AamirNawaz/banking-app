import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from '../../services/review/review.service';
import { CreateReviewDto } from '../../dto/review/create-review.dto';
import { UpdateReviewDto } from '../../dto/review/update-review.dto';
import { Review } from '../../entities/Review.entity';
import { Roles } from 'src/guard/roles.decorator';
import { UserGuard } from 'src/guard/user.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(UserGuard)
  @Roles('customer')
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @UseGuards(UserGuard)
  @Roles('customer')
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  @Roles('customer')
  @UseGuards(UserGuard)
  update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles('customer')
  @UseGuards(UserGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.reviewService.remove(id);
  }
}
