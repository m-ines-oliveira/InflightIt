export declare class SeatsService {
    private seats;
    getAllSeats(): {
        seats: {
            seatNumber: string;
            status: string;
        }[];
    };
    getSeatsByUser(userId: string): {
        userId: string;
        bookedSeats: {
            seatNumber: string;
            status: string;
        }[];
    };
    bookSeats(userId: string, seatNumbers: string[]): Promise<{
        message: string;
        failedSeats: string[];
        bookedSeats: string[];
    } | {
        message: string;
        bookedSeats: string[];
        failedSeats?: undefined;
    }>;
}
