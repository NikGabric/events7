import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventType } from '../model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventEditDto } from './dtos/event-edit.dto';
import { MessageDto } from '../common/dtos/message.dto';
import { NotFoundException } from '@nestjs/common';

const eventArr: Event[] = [
  {
    id: 1,
    name: 'Test Event',
    description: 'Test Event Desc',
    type: EventType.APP,
    priority: 4,
  },
  {
    id: 2,
    name: 'Test Event 2',
    description: 'Test Event Desc 2',
    type: EventType.CROSSPROMO,
    priority: 10,
  },
];

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventService,
          useValue: {
            getAllEvents: jest.fn().mockResolvedValue(eventArr),
            postEvent: jest
              .fn()
              .mockImplementation((event: EventDto) =>
                Promise.resolve({ id: 3, ...event }),
              ),
            deleteEvent: jest
              .fn()
              .mockResolvedValue(new MessageDto('Event deleted successfully')),
            putEvent: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(new MessageDto('Event edited successfully')),
              ),
          },
        },
      ],
      controllers: [EventController],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEvents', () => {
    it('should return an array of events', async () => {
      await expect(controller.getAll()).resolves.toEqual(eventArr);
    });
  });

  describe('postOne', () => {
    it('should create a new event', async () => {
      const newEvent: EventDto = {
        name: 'New Event',
        description: 'New event description',
        type: EventType.CROSSPROMO,
        priority: 1,
      };
      await expect(controller.postOne(newEvent)).resolves.toEqual({
        id: 3,
        ...newEvent,
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete an event', async () => {
      await expect(controller.deleteOne(1)).resolves.toEqual(
        new MessageDto('Event deleted successfully'),
      );
    });

    it('should return a not found exception', async () => {
      const spy = jest
        .spyOn(service, 'deleteEvent')
        .mockRejectedValue(new NotFoundException());
      await expect(controller.deleteOne(99)).rejects.toEqual(
        new NotFoundException(),
      );
      expect(spy).toBeCalledWith(99);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('putOne', () => {
    it('should update an existing event', async () => {
      const newEvent: EventEditDto = {
        name: 'Updated Event Name',
      };
      await expect(controller.putOne(1, newEvent)).resolves.toEqual(
        new MessageDto('Event edited successfully'),
      );
    });

    it('should return a not found exception', async () => {
      const newEvent: EventEditDto = {
        name: 'Updated Event Name',
      };
      const spy = jest
        .spyOn(service, 'putEvent')
        .mockRejectedValue(new NotFoundException());
      await expect(controller.putOne(99, newEvent)).rejects.toEqual(
        new NotFoundException(),
      );
      expect(spy).toBeCalledWith(99, newEvent);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
