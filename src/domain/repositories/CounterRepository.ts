import { Counter } from '../entities/Counter';

export interface CounterRepository {
  findById(id: string): Promise<Counter | null>;
  save(counter: Counter): Promise<void>;
}