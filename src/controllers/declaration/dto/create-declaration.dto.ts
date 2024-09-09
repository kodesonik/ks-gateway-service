import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeclarationDto {
  @ApiProperty({
    description: 'The year of the declaration',
    example: 2023,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'The files of the declaration',
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  files: string[];

  @ApiProperty({
    description: 'The declarations of the declaration',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  declarations: any[];

  @ApiProperty({
    description: 'Additional notes or comments',
    example: 'This declaration includes income from freelance work.',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
