import { Module } from '@nestjs/common';
import { SeatsController } from './seats/seats.controller';
import { SeatsService } from './seats/seats.service';

@Module({
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class AppModule {}
