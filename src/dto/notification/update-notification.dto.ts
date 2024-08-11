import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  readonly message?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;

  @IsOptional()
  @IsNumber()
  readonly user?: number;

  @IsOptional()
  readonly read_at?: Date;
}
