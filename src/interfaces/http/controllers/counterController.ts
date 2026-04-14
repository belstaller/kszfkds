import { z } from 'zod';
import { IncrementCounterUseCase } from '@/application/use-cases/IncrementCounterUseCase';

const incrementCounterBodySchema = z.object({
  counterId: z.string().min(1).default('default'),
  amount: z.number().int().positive(),
});

export class CounterController {
  constructor(private readonly incrementCounterUseCase: IncrementCounterUseCase) {}

  public async increment(input: unknown) {
    const dto = incrementCounterBodySchema.parse(input);
    return this.incrementCounterUseCase.execute(dto);
  }
}