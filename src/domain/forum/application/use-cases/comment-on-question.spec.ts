import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Choose Comment On Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await inMemoryQuestionRepository.create(question);

    const { questionComment } = await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "comment in question",
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1);
    expect(inMemoryQuestionCommentsRepository.items[0]).toBe(questionComment);
  });
});
