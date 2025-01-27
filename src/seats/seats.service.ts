import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatsService {
  private seats = new Map<string, { status: string; userId?: string }>([
    ['A1', { status: 'available' }],
    ['A2', { status: 'available' }],
    ['A3', { status: 'available' }],
  ]);

  // Get all seats with their statuses
  getAllSeats() {
    return {
      seats: Array.from(this.seats.entries()).map(([seatNumber, data]) => ({
        seatNumber,
        status: data.status,
      })),
    };
  }

  // Get all seats booked by a specific user
  getSeatsByUser(userId: string) {
    const bookedSeats = Array.from(this.seats.entries())
      .filter(([_, data]) => data.userId === userId)
      .map(([seatNumber, data]) => ({
        seatNumber,
        status: data.status,
      }));

    return {
      userId,
      bookedSeats,
    };
  }

  // Booking logic (already implemented in previous steps)
  async bookSeats(userId: string, seatNumbers: string[]) {
    const bookedSeats: string[] = [];
    const failedSeats: string[] = [];

    for (const seatNumber of seatNumbers) {
      const seat = this.seats.get(seatNumber);
      if (seat && seat.status === 'available') {
        seat.status = 'booked';
        seat.userId = userId;
        bookedSeats.push(seatNumber);
      } else {
        failedSeats.push(seatNumber);
      }
    }

    if (failedSeats.length > 0) {
      return {
        message: 'Some seats could not be booked.',
        failedSeats,
        bookedSeats,
      };
    }

    return {
      message: 'Seats successfully booked.',
      bookedSeats,
    };
  }
}
