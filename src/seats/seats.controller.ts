import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('api/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  getSeats(@Query('userId') userId?: string) {
    if (userId) {
      return this.seatsService.getSeatsByUser(userId);
    }
    return this.seatsService.getAllSeats();
  }

  @Post()
  bookSeats(@Body() body: { userId: string; seatNumbers: string[] }) {
    return this.seatsService.bookSeats(body.userId, body.seatNumbers);
  }
}
