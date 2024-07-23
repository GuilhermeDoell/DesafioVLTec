import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    private readonly mailService: MailService,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    await this.notesRepository.save(note);
    await this.mailService.sendMail(createNoteDto.userId, 'Nota criada', 'Sua nota foi criada com sucesso.');
    return note;
  }

  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  findOne(id): Promise<Note> {
    return this.notesRepository.findOne(id);
  }

  async update(id, updateNoteDto: UpdateNoteDto): Promise<Note> {
    await this.notesRepository.update(id, updateNoteDto);
    return this.notesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }
}