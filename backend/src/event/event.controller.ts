import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from 'src/model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';
import { MessageDto } from 'src/common/dtos/message.dto';

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

  @Delete()
  deleteEvent(
    @Query('id', new ParseIntPipe()) id: number,
  ): Promise<MessageDto> {
    console.log(id);
    return this.eventService.deleteEvent(id);
  }
}
