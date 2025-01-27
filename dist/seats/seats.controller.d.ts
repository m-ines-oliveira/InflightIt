import { SeatsService } from './seats.service';
export declare class SeatsController {
    private readonly seatsService;
    constructor(seatsService: SeatsService);
    getSeats(userId?: string): {
        userId: string;
        bookedSeats: {
            seatNumber: string;
            status: string;
        }[];
    } | {
        seats: {
            seatNumber: string;
            status: string;
        }[];
    };
    bookSeats(body: {
        userId: string;
        seatNumbers: string[];
    }): Promise<{
        message: string;
        failedSeats: string[];
        bookedSeats: string[];
    } | {
        message: string;
        bookedSeats: string[];
        failedSeats?: undefined;
    }>;
}
