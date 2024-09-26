import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Either, right } from "@/core/either";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityID(authorId),
      title,
    });

    await this.questionRepository.create(question);

    return right({ question });
  }
}
