export enum EventType {
  CROSSPROMO = 'crosspromo',
  LIVEOPS = 'liveops',
  APP = 'app',
  ADS = 'ads'
}

export interface Event {
  id: number;
  name: string;
  description: string;
  type: EventType;
  priority: number;
}

export interface EventDto {
  name: string;
  description: string;
  type: EventType | null;
  priority: number;
}

export interface EditEventDto {
  name?: string;
  description?: string;
  type?: EventType | null;
  priority?: number;
}
