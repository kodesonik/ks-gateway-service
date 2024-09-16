import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';
// import { CompleteProfileDto } from './complete-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  username?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  //country ISO code
  // @IsISoC
  // countryCode: string;

  // @IsString()
  // @IsOptional()
  // role: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referralCode: string;
}
