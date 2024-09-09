import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventDto, SearchEventsDto } from './dto';
import { msResponseFormatter } from 'src/helpers';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('event')
export class TicketController {
  constructor(@Inject('TICKET_SERVICE') private readonly client: ClientProxy) {}

  /**
   * Find Events
   * @param searchEventsDto
   * @returns
   */
  @Get()
  async findEvents(@Query() searchEventsDto: SearchEventsDto) {
    return await msResponseFormatter(
      this.client.send('find-events', searchEventsDto),
    );
  }

  /**
   * Find Event By Id
   * @param id
   * @returns
   */
  @Get(':id')
  async findEventById(@Param('id') id: string) {
    return await msResponseFormatter(this.client.send('find-event-by-id', id));
  }

  /**
   * Create Event
   * @param createEventDto
   * @returns
   */
  @ApiOperation({ summary: 'Save Event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async saveEvent(@Body() createEventDto: CreateEventDto) {
    return await msResponseFormatter(
      this.client.send('save-event', createEventDto),
    );
  }

  /**
   * Publish Event
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Publish Event' })
  @ApiResponse({ status: 200, description: 'Event published successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('publish/:id')
  async publishEvent(@Param('id') id: string) {
    return await msResponseFormatter(this.client.send('publish-event', { id }));
  }

  /**
   * Cancel Event
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Cancel Event' })
  @ApiResponse({ status: 200, description: 'Event canceled successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('cancel/:id')
  async cancelEvent(@Param('id') id: string) {
    return await msResponseFormatter(this.client.send('cancel-event', { id }));
  }

  /**
   * Complete Event
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Complete Event' })
  @ApiResponse({ status: 200, description: 'Event completed successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('complete/:id')
  async completeEvent(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('complete-event', { id }),
    );
  }

  /**
   * Activate Event
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Activate Event' })
  @ApiResponse({ status: 200, description: 'Event activated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('activate/:id')
  async activateEvent(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('activate-event', { id }),
    );
  }

  /**
   * Deactivate Event
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Deactivate Event' })
  @ApiResponse({ status: 200, description: 'Event deactivated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('deactivate/:id')
  async deactivateEvent(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('deactivate-event', { id }),
    );
  }

  /**
   * Delete Event
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete Event' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return await msResponseFormatter(this.client.send('delete-event', { id }));
  }

  /**
   * Get Event booked Tickets
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Get Event Booked Tickets' })
  @ApiResponse({
    status: 200,
    description: 'Event booked tickets fetched successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get(':id/booked-tickets')
  async getEventTickets(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('get-event-tickets', { id }),
    );
  }

  /**
   * Book Ticket
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Book Ticket' })
  @ApiResponse({ status: 200, description: 'Ticket booked successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('book-ticket/:id')
  async bookTicket(@Param('id') id: string) {
    return await msResponseFormatter(this.client.send('book-ticket', { id }));
  }

  /**
   * Confirm Booking
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Confirm Booking' })
  @ApiResponse({ status: 200, description: 'Booking confirmed successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('confirm-ticket-booking/:id')
  async confirmBooking(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('confirm-booking', { id }),
    );
  }

  /**
   * Cancel Booking
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Cancel Booking' })
  @ApiResponse({ status: 200, description: 'Booking canceled successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('cancel-ticket-booking/:id')
  async cancelBooking(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('cancel-booking', { id }),
    );
  }

  /**
   * Refund Booking
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Refund Booking' })
  @ApiResponse({ status: 200, description: 'Booking refunded successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('refund-ticket-booking/:id')
  async refundBooking(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('refund-booking', { id }),
    );
  }

  /**
   * Control ticket
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Control Ticket' })
  @ApiResponse({ status: 200, description: 'Ticket controlled successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('control-ticket/:id')
  async controlTicket(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('control-ticket', { id }),
    );
  }
}
