import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { ResourceNotFoundError } from "./errors/resource-nout-found-errror";
import { Either, right } from "@/core/either";

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return right({ question });
  }
}
