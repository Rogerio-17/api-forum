import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "@/domain/repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
