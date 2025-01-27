"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatsService = void 0;
const common_1 = require("@nestjs/common");
let SeatsService = class SeatsService {
    constructor() {
        this.seats = new Map([
            ['A1', { status: 'available' }],
            ['A2', { status: 'available' }],
            ['A3', { status: 'available' }],
        ]);
    }
    getAllSeats() {
        return {
            seats: Array.from(this.seats.entries()).map(([seatNumber, data]) => ({
                seatNumber,
                status: data.status,
            })),
        };
    }
    getSeatsByUser(userId) {
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
    async bookSeats(userId, seatNumbers) {
        const bookedSeats = [];
        const failedSeats = [];
        for (const seatNumber of seatNumbers) {
            const seat = this.seats.get(seatNumber);
            if (seat && seat.status === 'available') {
                seat.status = 'booked';
                seat.userId = userId;
                bookedSeats.push(seatNumber);
            }
            else {
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
};
exports.SeatsService = SeatsService;
exports.SeatsService = SeatsService = __decorate([
    (0, common_1.Injectable)()
], SeatsService);
//# sourceMappingURL=seats.service.js.map