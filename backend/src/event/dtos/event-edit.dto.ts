import { PartialType } from '@nestjs/mapped-types';
import { EventDto } from './event.dto';

export class EventEditDto extends PartialType(EventDto) {}
