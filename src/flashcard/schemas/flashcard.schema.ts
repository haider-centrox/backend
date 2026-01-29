import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlashcardDocument = Flashcard & Document;

@Schema({ timestamps: true })
export class Flashcard {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
