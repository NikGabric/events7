import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from 'src/model/event.repository';
import { Event } from 'src/model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async postEvent(eventDto: EventDto): Promise<EventInfoDto> {
    const event = await this.eventRepository.save(eventDto);
    return new EventInfoDto(event);
  }
}
