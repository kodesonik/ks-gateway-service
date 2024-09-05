import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
  @ApiProperty({
    description: 'Search query',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  q: string;

  @ApiProperty({
    description: 'Limit',
    required: false,
    default: 10,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Skip',
    required: false,
    default: 0,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  skip: number;

  @ApiProperty({
    description: 'Language',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  lang: string;

  @ApiProperty({
    description: 'Sort by',
    examples: ['createdAt', 'updatedAt', 'lastname,firtsname'],
    default: 'createdAt',
    required: false,
    type: String,
  })
  @Transform(({ value }) => {
    console.log('Sort', value);
    if (!value) return [];
    return typeof value === 'string' ? value.split(',') : value;
  })
  @IsOptional()
  @IsArray()
  sort: string;

  @ApiProperty({
    description: 'Sorting order',
    required: false,
    default: 'ASC',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
