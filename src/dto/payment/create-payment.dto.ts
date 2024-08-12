import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  readonly booking: number;

  @IsNotEmpty()
  @IsString()
  readonly payment_method: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['pending', 'completed', 'failed'])
  readonly status: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
