import {
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  readonly booking?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating?: number;

  @IsOptional()
  @IsString()
  readonly review?: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
