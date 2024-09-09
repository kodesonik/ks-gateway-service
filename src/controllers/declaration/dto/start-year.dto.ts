import { IsNotEmpty, IsNumber, Min, Max, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartYearDto {
  @ApiProperty({
    description: 'The year to start the declaration for',
    example: 2023,
    minimum: 2000,
    maximum: 2100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(2000)
  @Max(2100)
  year: number;

  @ApiProperty({
    description: 'The start date of the declaration',
    example: '2023-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the declaration',
    example: '2023-12-31',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
