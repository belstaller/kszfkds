import { CounterRepository } from '@/domain/repositories/CounterRepository';
import { CounterPolicy } from '@/domain/services/CounterPolicy';
import {
  IncrementCounterInputDto,
  IncrementCounterOutputDto,
} from '../dtos/IncrementCounterDto';

export class IncrementCounterUseCase {
  constructor(
    private readonly counterRepository: CounterRepository,
    private readonly counterPolicy: CounterPolicy,
  ) {}

  public async execute(
    dto: IncrementCounterInputDto,
  ): Promise<IncrementCounterOutputDto> {
    this.counterPolicy.ensureIncrementAmount(dto.amount);

    const counter = await this.counterRepository.findById(dto.counterId);

    if (!counter) {
      throw new Error('Counter not found.');
    }

    counter.increment(dto.amount);
    await this.counterRepository.save(counter);

    return {
      counterId: counter.getId(),
      value: counter.getValue().getValue(),
      updatedAt: counter.getUpdatedAt().toISOString(),
    };
  }
}