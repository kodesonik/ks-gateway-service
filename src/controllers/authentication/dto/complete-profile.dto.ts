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
  email: string;

  //country ISO code
  // @IsISoC
  // countryCode: string;

  // @IsString()
  // @IsOptional()
  // role: string;

  @ApiProperty()
  @Transform(({ value }) => {
    // recieved format: 30/01/2000
    console.log(value);
    const formatedDate =
      value && typeof value === 'string' && value?.includes('/')
        ? value?.split('/')?.reverse()?.join('-')
        : value;
    return new Date(formatedDate);
  })
  @IsDate()
  // Set max date Must have 10yrs old
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

  @IsString()
  @IsOptional()
  address: string;
}
