import { z } from 'zod';
import { GetCounterUseCase } from '@/application/use-cases/GetCounterUseCase';
import { IncrementCounterUseCase } from '@/application/use-cases/IncrementCounterUseCase';

const counterIdSchema = z.string().min(1).default('default');
const incrementCounterBodySchema = z.object({
  counterId: counterIdSchema,
  amount: z.number().int().positive().default(1),
});

export class CounterController {
  constructor(
    private readonly getCounterUseCase: GetCounterUseCase,
    private readonly incrementCounterUseCase: IncrementCounterUseCase,
  ) {}

  public async get(input: unknown) {
    const counterId = counterIdSchema.parse(input);
    return this.getCounterUseCase.execute(counterId);
  }

  public async increment(input: unknown) {
    const dto = incrementCounterBodySchema.parse(input);
    return this.incrementCounterUseCase.execute(dto);
  }
}
