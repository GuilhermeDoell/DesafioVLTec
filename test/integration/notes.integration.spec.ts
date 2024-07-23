import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NotesModule } from 'src/notes/notes.module';

describe('Notes Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST notes', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({ title: 'Integration Test Note', description: 'Integration Test Description', userId: '1' })
      .expect(201)
      .expect(({ body }) => {
        expect(body.title).equal('Integration Test Note');
      });
  });

  // Adicione mais testes para GET, PUT e DELETE
});