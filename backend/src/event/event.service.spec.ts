import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { TypeORMPostgresTestingModule } from '../../test/TypeORMPostgresTestingModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from '../model/event.repository';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMPostgresTestingModule([Event]),
        TypeOrmModule.forFeature([Event]),
      ],
      providers: [EventService, EventRepository],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
