import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { EventType } from 'src/model/event.entity';

export class EventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(EventType)
  type: EventType;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  priority: number;
}
