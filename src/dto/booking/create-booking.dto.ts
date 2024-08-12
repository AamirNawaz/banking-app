import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  readonly user: number;

  @IsNotEmpty()
  @IsString()
  readonly service: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['pending', 'confirmed', 'completed', 'canceled'])
  readonly status: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
