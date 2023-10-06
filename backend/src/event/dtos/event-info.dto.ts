import { Event, EventType } from 'src/model/event.entity';

export class EventInfoDto {
  constructor(event: Event) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.type = event.type;
    this.priority = event.priority;
  }

  id: number;
  name: string;
  description: string;
  type: EventType;
  priority: number;
}
