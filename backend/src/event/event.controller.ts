import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from 'src/model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/all')
  getEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Post()
  postEvent(@Body() eventDto: EventDto): Promise<EventInfoDto> {
    return this.eventService.postEvent(eventDto);
  }
}
