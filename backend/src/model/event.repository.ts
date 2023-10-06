import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(@InjectRepository(Event) repository: Repository<Event>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
