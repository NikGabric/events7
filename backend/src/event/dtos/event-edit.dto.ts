import { OmitType, PartialType } from '@nestjs/mapped-types';
import { EventDto } from './event.dto';

export class EventEditDto extends PartialType(
  OmitType(EventDto, ['name', 'description', 'type', 'priority'] as const),
) {}
