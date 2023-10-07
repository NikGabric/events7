import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { EventType } from '../../model/event.entity';

export class EventDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(3, 80)
  description: string;

  @IsEnum(EventType)
  type: EventType;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  priority: number;
}
