import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../src/notes/notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '../src/notes/note.entity';
import { Repository } from 'typeorm';
import { MailService } from '../src/mail/mail.service';

describe('NotesService', () => {
  let service: NotesService;
  let repository: Repository<Note>;

  const mockNoteRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockMailService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: mockNoteRepository },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a note', async () => {
    const note = { title: 'Test Note', description: 'Test Description', userId: '1' };
    mockNoteRepository.create.mockReturnValue(note);
    mockNoteRepository.save.mockResolvedValue(note);

    expect(await service.create(note)).toEqual(note);
    expect(mockNoteRepository.create).toHaveBeenCalledWith(note);
    expect(mockNoteRepository.save).toHaveBeenCalledWith(note);
    expect(mockMailService.sendMail).toHaveBeenCalled();
  });

  // Adicione mais testes para findAll, findOne, update e remove
});