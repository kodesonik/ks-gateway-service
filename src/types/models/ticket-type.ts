import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class TicketType {
  @ApiProperty({
    description: 'Ticket type seat number start',
    example: 100,
  })
  @IsNumber()
  seatNumberStart: number;

  @ApiProperty({
    description: 'Ticket type name',
    example: 'VIP',
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: 0,
    description: 'Available tickets for this type',
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    default: 0,
    description: 'number of people who have bought the ticket',
  })
  @IsNumber()
  saled: number;

  @ApiProperty({
    description: 'ticket price',
    example: 10000,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    default: 1,
    description: 'maximum number of people who can access the ticket',
  })
  @IsNumber()
  access: number;
}
