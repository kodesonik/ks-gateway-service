import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsDate,
  MaxDate,
} from 'class-validator';

export class CompleteProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

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
  @Transform(({ value }) => new Date(value))
  @IsDate()
  // Set max date Must have 10yrs old
  @ApiProperty()
  @MaxDate(
    new Date(
      new Date().getFullYear() - 10,
      new Date().getMonth(),
      new Date().getDate(),
    ),
    { message: 'You must be at least 10 years old' },
  )
  @IsOptional()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;
}
