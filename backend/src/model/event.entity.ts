import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EventType {
  CROSSPROMO = 'crosspromo',
  LIVEOPS = 'liveops',
  APP = 'app',
  ADS = 'ads',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  type: EventType;

  @Column()
  priority: number;
}
