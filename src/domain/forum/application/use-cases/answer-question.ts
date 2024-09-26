import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { Either, right } from "@/core/either";

interface AnswerQuestionUseCaseRequest {
  content: string;
  instructorId: string;
  questionId: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;
export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}
