import {
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventStatus, Account, TicketType } from 'src/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Event id',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Event title',
    example: 'Event title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Event description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Event type',
    example: 'Event type',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Event tags',
    example: ['tag1', 'tag2', 'tag3'],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Event town',
    example: 'Event town',
  })
  @IsString()
  town: string;

  @ApiProperty({
    description: 'Event address',
    example: 'Event address',
  })
  @IsObject()
  address: any;

  @ApiProperty({
    description: 'Event start date',
    example: '2021-01-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Event end date',
    example: '2021-01-01',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Event guests',
    example: ['guest1', 'guest2', 'guest3'],
  })
  @IsArray()
  @IsString({ each: true })
  guests: string[];

  @ApiProperty({
    description: 'Event images',
    example: ['image1', 'image2', 'image3'],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({
    description: 'Event cover image',
    example: 'image1',
  })
  @IsString()
  coverImage: string;

  @ApiProperty({
    description: 'Event organizer',
    example: 'Organizer',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Account)
  organizer: Account;

  @ApiProperty({
    description: 'Event status',
    example: 'Event status',
  })
  @IsEnum(EventStatus)
  status: EventStatus;

  @ApiProperty({
    description: 'Event ticket types',
    example: [
      {
        seatNumberStart: 100,
        name: 'VIP',
        count: 100,
        price: 100,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketType)
  ticketTypes: TicketType[];
}
