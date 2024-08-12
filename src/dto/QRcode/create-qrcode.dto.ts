import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateQRCodeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly user: number;

  @IsNotEmpty()
  @IsString()
  readonly qr_code_data: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
