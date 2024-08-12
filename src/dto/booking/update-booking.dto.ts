import {
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
} from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  readonly user?: number;

  @IsOptional()
  @IsString()
  readonly service?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['pending', 'confirmed', 'completed', 'canceled'])
  readonly status?: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
