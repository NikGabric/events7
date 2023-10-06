import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from '../model/event.repository';
import { TypeORMPostgresTestingModule } from '../../test/TypeORMPostgresTestingModule';
import { Event } from '../model/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('EventController', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMPostgresTestingModule([Event]),
        TypeOrmModule.forFeature([Event]),
      ],
      providers: [EventService, EventRepository],
      controllers: [EventController],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
