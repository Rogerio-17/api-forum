import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "../use-cases/send-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notification-repository";
import { MockInstance } from "vitest";
import { waitFor } from "test/utils/wait-for";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";
import { OnQuestionCommentCreated } from "./on-question-comment-created";
import { makeQuestion } from "test/factories/make-question";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>;

describe("On Question Comment Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );

    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    new OnQuestionCommentCreated(
      inMemoryQuestionsRepository,
      sendNotificationUseCase
    );
  });

  it("should send a notification when an question comment is created", async () => {
    const question = makeQuestion();
    const questionComment = makeQuestionComment({ questionId: question.id });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryQuestionCommentsRepository.create(questionComment);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
