import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;

  @IsPhoneNumber(null)
  @IsOptional()
  readonly phone_number?: string;

  @IsUrl()
  @IsOptional()
  readonly profile_picture?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly role: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly address?: string;
}
