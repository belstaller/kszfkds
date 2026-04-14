import { CounterPolicy } from '@/domain/services/CounterPolicy';
import { IncrementCounterUseCase } from '@/application/use-cases/IncrementCounterUseCase';
import { GetCounterUseCase } from '@/application/use-cases/GetCounterUseCase';
import { PostgresCounterRepository } from '@/infrastructure/repositories/PostgresCounterRepository';
import { CounterController } from '../controllers/counterController';

const counterRepository = new PostgresCounterRepository();
const counterPolicy = new CounterPolicy();

export const getCounterUseCase = new GetCounterUseCase(counterRepository);
export const incrementCounterUseCase = new IncrementCounterUseCase(
  counterRepository,
  counterPolicy,
);

export const counterController = new CounterController(
  getCounterUseCase,
  incrementCounterUseCase,
);

export { counterRepository };
