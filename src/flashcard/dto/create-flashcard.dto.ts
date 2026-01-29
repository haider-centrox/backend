import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
