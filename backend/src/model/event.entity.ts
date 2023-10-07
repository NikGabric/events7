import { Length, Max, Min } from 'class-validator';
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

  @Column({ nullable: false })
  @Length(3, 20)
  name: string;

  @Column({ nullable: false })
  @Length(3, 240)
  description: string;

  @Column({
    type: 'enum',
    enum: EventType,
    nullable: false,
  })
  type: EventType;

  @Column({ nullable: false })
  @Min(0)
  @Max(10)
  priority: number;
}
