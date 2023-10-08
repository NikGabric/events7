import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '../model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';
import { MessageDto } from '../common/dtos/message.dto';
import { EventEditDto } from './dtos/event-edit.dto';

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

  @Delete('/:id')
  deleteEvent(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<MessageDto> {
    return this.eventService.deleteEvent(id);
  }

  @Put('/:id')
  putEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() eventDto: EventEditDto,
  ): Promise<MessageDto> {
    return this.eventService.putEvent(id, eventDto);
  }
}
