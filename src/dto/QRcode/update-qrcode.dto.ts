import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';

export class UpdateQRCodeDto {
  @IsOptional()
  @IsNumber()
  readonly user?: number;

  @IsOptional()
  @IsString()
  readonly qr_code_data?: string;

  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
