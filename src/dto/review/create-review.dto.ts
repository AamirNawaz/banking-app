import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  readonly booking: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsNotEmpty()
  @IsString()
  readonly review: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
