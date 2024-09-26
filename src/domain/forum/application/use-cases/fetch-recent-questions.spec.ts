import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Get Recent Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 8, 20) })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 8, 18) })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 8, 23) })
    );

    const result = await sut.execute({ page: 1 });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 8, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 8, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 8, 18) }),
    ]);
  });

  it("should be able to fetch pagination recent questions", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2024, 8, i) })
      );
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value?.questions).toHaveLength(2);
  });
});
