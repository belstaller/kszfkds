import { z, ZodError } from 'zod';
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
    try {
      const counterId = counterIdSchema.parse(input);
      return await this.getCounterUseCase.execute(counterId);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error('Invalid counter id.');
      }

      throw error;
    }
  }

  public async increment(input: unknown) {
    try {
      const dto = incrementCounterBodySchema.parse(input);
      return await this.incrementCounterUseCase.execute(dto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error('Invalid increment payload.');
      }

      throw error;
    }
  }
}
