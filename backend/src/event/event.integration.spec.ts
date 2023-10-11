import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, EventType } from '../model/event.entity';
import { EventDto } from './dtos/event.dto';
import { EventEditDto } from './dtos/event-edit.dto';
import { MessageDto } from '../common/dtos/message.dto';

describe('EventController (Integration Tests)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.TEST_DB_HOST,
          port: parseInt(process.env.TEST_DB_PORT),
          username: process.env.TEST_DB_USER,
          password: process.env.TEST_DB_PASS,
          database: process.env.TEST_DB_NAME,
          entities: [Event],
          synchronize: true,
          autoLoadEntities: true,
          migrations: [],
        }),
        AppModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    const response = await request(app.getHttpServer())
      .get('/event/all')
      .expect(200)
      .expect('Content-Type', /json/);

    response.body.forEach(async (event: Event) => {
      await request(app.getHttpServer())
        .delete(`/event/${event.id}`)
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });

  describe('getAll', () => {
    it('should fetch all events', async () => {
      const response = await request(app.getHttpServer())
        .get('/event/all')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((event: Event) => {
        expect(typeof event).toBe('object');
        expect(event.id).toBeDefined();
      });
    });
  });

  describe('postOne', () => {
    it('should create a new event', async () => {
      const eventDto: EventDto = {
        name: 'Test Event',
        description: 'Test Event Description',
        type: EventType.APP,
        priority: 4,
      };

      const response = await request(app.getHttpServer())
        .post('/event')
        .send(eventDto)
        .expect(201);

      expect(response.body).toMatchObject({
        name: eventDto.name,
        description: eventDto.description,
        type: eventDto.type,
        priority: eventDto.priority,
        id: expect.any(Number),
      });
    });
  });

  describe('putOne', () => {
    it('should update an existing event', async () => {
      const createEventDto: EventDto = {
        name: 'Test Event',
        description: 'Test Event Description',
        type: EventType.APP,
        priority: 4,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/event')
        .send(createEventDto)
        .expect(201);

      const updateEventDto: EventEditDto = {
        name: 'Updated Test Event',
      };

      const updateResponse = await request(app.getHttpServer())
        .put(`/event/${createResponse.body.id}`)
        .send(updateEventDto)
        .expect(200);

      expect(updateResponse.body).toMatchObject(
        new MessageDto('Event edited successfully'),
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete an event and return error 404 when event not found', async () => {
      const eventDto = {
        name: 'Test Event',
        description: 'Test Event Description',
        type: EventType.APP,
        priority: 4,
      };
      const createResponse = await request(app.getHttpServer())
        .post('/event')
        .send(eventDto)
        .expect(201);

      const eventIdToDelete = createResponse.body.id;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/event/${eventIdToDelete}`)
        .expect(200);

      expect(deleteResponse.body).toEqual({
        message: 'Event deleted successfully',
      });

      await request(app.getHttpServer())
        .get(`/event/${eventIdToDelete}`)
        .expect(404);
    });
  });
});
