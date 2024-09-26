import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("create a anserws", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a answers", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Conteudo da resposta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value?.answer.id
    );
  });
});
