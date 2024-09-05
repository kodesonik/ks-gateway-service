import {
  IsDate,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from 'src/types';

export class CreateUserDto {
  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsDate()
  birthdate: Date;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
