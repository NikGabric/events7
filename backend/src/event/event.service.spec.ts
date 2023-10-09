import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event, EventType } from '../model/event.entity';
import { Repository } from 'typeorm';
import { EventDto } from './dtos/event.dto';
import { MessageDto } from '../common/dtos/message.dto';
import { NotFoundException } from '@nestjs/common';
import { EventEditDto } from './dtos/event-edit.dto';

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

const newEvent: EventDto = {
  name: 'New Event',
  description: 'New Event Desc',
  type: EventType.LIVEOPS,
  priority: 4,
};

describe('EventService', () => {
  let eventService: EventService;
  let eventRepository: Repository<Event>;

  const mockRepository = {
    find: jest.fn().mockResolvedValue(eventArr),
    save: jest.fn().mockResolvedValue({ id: 1, ...newEvent }),
    delete: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository,
        },
      ],
    }).compile();

    eventService = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(eventService).toBeDefined();
  });

  describe('getAllEvents', () => {
    it('should return an array of events', async () => {
      const events = await eventService.getAllEvents();
      expect(events).toEqual(eventArr);
    });
  });

  describe('postEvent', () => {
    it('should successfully insert an event', async () => {
      const res = await eventService.postEvent(newEvent);
      expect(res).toEqual({ id: 1, ...newEvent });
      expect(eventRepository.save).toHaveBeenCalledTimes(1);
      expect(eventRepository.save).toHaveBeenCalledWith(newEvent);
    });
  });

  describe('deleteEvent', () => {
    it('should return a successfull delete message', async () => {
      const res = await eventService.deleteEvent(1);
      expect(res).toEqual(new MessageDto('Event deleted successfully'));
    });

    it('should throw a NotFoundException when trying to delete a non-existent event', async () => {
      const spy = jest
        .spyOn(eventRepository, 'delete')
        .mockRejectedValueOnce(new NotFoundException());
      mockRepository.delete.mockResolvedValueOnce({ affected: 0 });
      expect(eventService.deleteEvent(99)).rejects.toThrowError(
        NotFoundException,
      );
      expect(spy).toHaveBeenCalledWith(99);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('putEvent', () => {
    it('should update the event', async () => {
      const newEvent: EventEditDto = {
        name: 'Updated Test Event',
      };
      const event = await eventService.putEvent(1, newEvent);
      expect(event).toEqual(new MessageDto('Event edited successfully'));
      expect(eventRepository.update).toBeCalledTimes(1);
      expect(eventRepository.update).toBeCalledWith(
        { id: 1 },
        { name: 'Updated Test Event' },
      );
    });

    it('should return throw a not found exception when trying to update a non-existent event', async () => {
      const spy = jest
        .spyOn(eventRepository, 'update')
        .mockRejectedValueOnce(new NotFoundException());
      mockRepository.update.mockResolvedValueOnce({ affected: 0 });

      const newEvent: EventEditDto = {
        name: 'Updated Test Event',
      };
      expect(eventService.putEvent(99, newEvent)).rejects.toThrowError(
        NotFoundException,
      );
      expect(eventRepository.update).toHaveBeenCalledTimes(1);
      expect(eventRepository.update).toHaveBeenCalledWith(
        { id: 99 },
        { name: 'Updated Test Event' },
      );
      expect(spy).toHaveBeenCalledWith(
        { id: 99 },
        { name: 'Updated Test Event' },
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
