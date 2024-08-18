import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateQRCodeDto {
  @IsNotEmpty()
  @IsString()
  readonly qr_code_data: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
