import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';
import { EventEditDto } from './dtos/event-edit.dto';
import { EventRepository } from '../model/event.repository';
import { Event } from '../model/event.entity';
import { MessageDto } from '../common/dtos/message.dto';

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
    if (res.affected !== 0) return new MessageDto('Event deleted successfully');
    else throw new NotFoundException();
  }

  async putEvent(id: number, eventDto: EventEditDto): Promise<MessageDto> {
    const res = await this.eventRepository
      .createQueryBuilder()
      .select()
      .update('event', { ...eventDto })
      .where('id = :id', { id })
      .execute();
    if (res.affected !== 0) return new MessageDto('Event edited successfully');
    else throw new NotFoundException();
  }
}
