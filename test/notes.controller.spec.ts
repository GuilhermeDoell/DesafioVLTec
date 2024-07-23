import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../src/notes/notes.controller';
import { NotesService } from '../src/notes/notes.service';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNotesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        { provide: NotesService, useValue: mockNotesService },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a note', async () => {
    const noteDto = { title: 'Test Note', description: 'Test Description', userId: '1' };
    const note = { id: '1', ...noteDto, createdAt: new Date() };
    mockNotesService.create.mockResolvedValue(note);

    expect(await controller.create(noteDto)).toEqual(note);
    expect(mockNotesService.create).toHaveBeenCalledWith(noteDto);
  });

  // Adicione mais testes para findAll, findOne, update e remove
});