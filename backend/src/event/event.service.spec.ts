import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { TypeORMPostgresTestingModule } from '../../test/TypeORMPostgresTestingModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from '../model/event.repository';
import { Event, EventType } from '../model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventInfoDto } from './dtos/event-info.dto';
import { MessageDto } from '../common/dtos/message.dto';
import { DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EventEditDto } from './dtos/event-edit.dto';

describe('EventService', () => {
  let service: EventService;
  let repository: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMPostgresTestingModule([Event]),
        TypeOrmModule.forFeature([Event]),
      ],
      providers: [EventService, EventRepository],
    }).compile();

    service = module.get<EventService>(EventService);
    repository = module.get<EventRepository>(EventRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllEvents', () => {
    it('should get all events', async () => {
      const mockEvents: Event[] = [
        {
          id: 1,
          name: 'mock-event1',
          description: 'mock-description1',
          type: EventType.ADS,
          priority: 3,
        },
      ];
      const getAllEventsMock = jest
        .spyOn(service, 'getAllEvents')
        .mockResolvedValue(mockEvents);
      const getEvents = await service.getAllEvents();

      expect(getEvents).toEqual(mockEvents);
      expect(getAllEventsMock).toHaveBeenCalledTimes(1);
      getAllEventsMock.mockRestore();
    });
  });

  describe('postEvent', () => {
    it('should create a new event', async () => {
      const eventDto: EventDto = {
        name: 'mock-event1',
        description: 'mock-description1',
        type: EventType.ADS,
        priority: 3,
      };
      const savedEvent: Event = {
        id: 1,
        ...eventDto,
      };
      const expectedEventInfoDto: EventInfoDto = new EventInfoDto(savedEvent);

      const getAllEventsMock = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(savedEvent);
      const res: EventInfoDto = await service.postEvent(eventDto);

      expect(res).toEqual(expectedEventInfoDto);

      getAllEventsMock.mockRestore();
    });
  });

  describe('deleteEvent', () => {
    it('should delete event with given id and return a success message', async () => {
      const idToDelete: number = 1;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: {} as DeleteResult['raw'] });
      const res: MessageDto = await service.deleteEvent(idToDelete);
      expect(res).toEqual(new MessageDto('Event deleted successfully'));
    });

    it('should throw a NotFoundException when event is not found', async () => {
      const eventIdToDelete = 2;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0, raw: {} as DeleteResult['raw'] });

      const res = service.deleteEvent(eventIdToDelete);
      await expect(res).rejects.toThrowError(NotFoundException);
    });
  });

  // describe('putEvent', () => {
  it('should update an event and return a success message', async () => {
    const eventDto: EventDto = {
      name: 'Event Name',
      description: 'Event description',
      type: EventType.APP,
      priority: 2,
    };
    const eventIdToUpdate = (await repository.save({ ...eventDto })).id;

    const eventEditDto: EventEditDto = {
      name: 'Edited Event Name',
    };

    jest.spyOn(repository.createQueryBuilder(), 'update').mockReturnThis();
    jest.spyOn(repository.createQueryBuilder(), 'where').mockReturnThis();
    jest
      .spyOn(repository.createQueryBuilder(), 'execute')
      .mockResolvedValue({ affected: 1 });

    const result: MessageDto = await service.putEvent(
      eventIdToUpdate,
      eventEditDto,
    );

    expect(result).toEqual(new MessageDto('Event edited successfully'));

    await repository.clear();
  });
  // });
});
