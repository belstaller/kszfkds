import { CounterRepository } from '@/domain/repositories/CounterRepository';

export interface GetCounterOutputDto {
  counterId: string;
  value: number;
  updatedAt: string;
}

export class GetCounterUseCase {
  constructor(private readonly counterRepository: CounterRepository) {}

  public async execute(counterId: string): Promise<GetCounterOutputDto> {
    const counter = await this.counterRepository.findById(counterId);

    if (!counter) {
      throw new Error('Counter not found.');
    }

    return {
      counterId: counter.getId(),
      value: counter.getValue().getValue(),
      updatedAt: counter.getUpdatedAt().toISOString(),
    };
  }
}