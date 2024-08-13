import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
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
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
  ): Promise<Review> {
    const userId = req.user.sub;
    return this.reviewService.create(userId, createReviewDto);
  }

  @Get()
  @UseGuards(UserGuard)
  @Roles('customer')
  findAll(@Req() req): Promise<Review[]> {
    const userId = req.user.sub;
    return this.reviewService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: number, @Req() req): Promise<Review> {
    const userId = req.user.sub;
    return this.reviewService.findOne(id, userId);
  }

  @Put(':id')
  @Roles('customer')
  @UseGuards(UserGuard)
  update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req,
  ): Promise<Review> {
    const userId = req.user.sub;
    return this.reviewService.update(id, userId, updateReviewDto);
  }

  @Delete(':id')
  @Roles('customer')
  @UseGuards(UserGuard)
  remove(@Param('id') id: number, @Req() req): Promise<void> {
    const userId = req.user.sub;
    return this.reviewService.remove(id, userId);
  }
}
