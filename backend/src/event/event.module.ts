import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/model/event.entity';
import { EventRepository } from 'src/model/event.repository';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository],
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
