import { Test, TestingModule } from '@nestjs/testing';
import { SeatsService } from './seats.service';

describe('SeatsService', () => {
  let service: SeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatsService],
    }).compile();

    service = module.get<SeatsService>(SeatsService);
  });

  describe('getAllSeats', () => {
    it('should return all seats with their statuses', () => {
      const result = service.getAllSeats();
      expect(result.seats).toEqual([
        { seatNumber: 'A1', status: 'available' },
        { seatNumber: 'A2', status: 'available' },
        { seatNumber: 'A3', status: 'available' },
      ]);
    });
  });

  describe('getSeatsByUser', () => {
    it('should return seats booked by a specific user', () => {
      service.bookSeats('user1', ['A1']);
      const result = service.getSeatsByUser('user1');
      expect(result).toEqual({
        userId: 'user1',
        bookedSeats: [
          { seatNumber: 'A1', status: 'booked' },
        ],
      });
    });

    it('should return an empty array if no seats are booked by the user', () => {
      const result = service.getSeatsByUser('user2');
      expect(result).toEqual({
        userId: 'user2',
        bookedSeats: [],
      });
    });
  });

  describe('bookSeats', () => {
    it('should book available seats successfully', async () => {
      const result = await service.bookSeats('user1', ['A1', 'A2']);
      expect(result).toEqual({
        message: 'Seats successfully booked.',
        bookedSeats: ['A1', 'A2'],
      });

      // Ensure seat statuses are updated
      const allSeats = service.getAllSeats();
      expect(allSeats.seats).toContainEqual({ seatNumber: 'A1', status: 'booked' });
      expect(allSeats.seats).toContainEqual({ seatNumber: 'A2', status: 'booked' });
    });

    it('should fail to book already booked seats', async () => {
      await service.bookSeats('user1', ['A1']);
      const result = await service.bookSeats('user2', ['A1', 'A2']);
      expect(result).toEqual({
        message: 'Some seats could not be booked.',
        failedSeats: ['A1'],
        bookedSeats: ['A2'],
      });
    });
    it('should return an error for invalid seat numbers', async () => {
      const result = await service.bookSeats('user1', ['A4']);
      
      expect(result).toStrictEqual({
        message: 'Some seats could not be booked.',
        failedSeats: ['A4'],
        bookedSeats: []
      });
    })
  })
})