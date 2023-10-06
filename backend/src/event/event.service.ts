import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from 'src/model/event.repository';
import { Event } from 'src/model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';
import { MessageDto } from 'src/common/dtos/message.dto';

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

  async deleteEvent(id: number): Promise<MessageDto> {
    console.log(id);
    const res = await this.eventRepository.delete(id);
    if (res.affected !== 0) {
      return new MessageDto('Event deleted successfully');
    } else throw new NotFoundException();
  }
}
