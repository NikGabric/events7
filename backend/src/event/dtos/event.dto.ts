import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { EventType } from '../../model/event.entity';
import { NoWhitespaceConstraint } from '../../common/decorators/no-whitespace.decorator';

export class EventDto {
  @IsString()
  @Length(3, 20)
  @Validate(NoWhitespaceConstraint)
  name: string;

  @IsString()
  @Length(3, 240)
  @Validate(NoWhitespaceConstraint)
  description: string;

  @IsEnum(EventType)
  type: EventType;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  priority: number;
}
