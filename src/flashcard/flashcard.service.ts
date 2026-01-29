import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flashcard, FlashcardDocument } from './schemas/flashcard.schema';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel(Flashcard.name) private flashcardModel: Model<FlashcardDocument>,
  ) {}

  async create(createFlashcardDto: CreateFlashcardDto): Promise<Flashcard> {
    const createdFlashcard = new this.flashcardModel(createFlashcardDto);
    return createdFlashcard.save();
  }

  async findAll(): Promise<Flashcard[]> {
    return this.flashcardModel.find().exec();
  }

  async findOne(id: string): Promise<Flashcard> {
    const flashcard = await this.flashcardModel.findById(id).exec();
    if (!flashcard) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }
    return flashcard;
  }

  async update(id: string, updateFlashcardDto: UpdateFlashcardDto): Promise<Flashcard> {
    const updatedFlashcard = await this.flashcardModel
      .findByIdAndUpdate(id, updateFlashcardDto, { new: true })
      .exec();
    if (!updatedFlashcard) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }
    return updatedFlashcard;
  }

  async remove(id: string): Promise<Flashcard> {
    const deletedFlashcard = await this.flashcardModel.findByIdAndDelete(id).exec();
    if (!deletedFlashcard) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }
    return deletedFlashcard;
  }
}
