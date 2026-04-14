import { IncrementCounterUseCase } from './IncrementCounterUseCase';
import { Counter } from '@/domain/entities/Counter';
import { CounterPolicy } from '@/domain/services/CounterPolicy';
import { CounterValue } from '@/domain/value-objects/CounterValue';

describe('IncrementCounterUseCase', () => {
  it('increments an existing counter and persists the new value', async () => {
    const counter = new Counter('default', new CounterValue(1), new Date('2024-01-01T00:00:00.000Z'));
    const counterRepository = {
      findById: jest.fn().mockResolvedValue(counter),
      save: jest.fn().mockResolvedValue(undefined),
    };
    const counterPolicy = new CounterPolicy();
    const useCase = new IncrementCounterUseCase(counterRepository as never, counterPolicy);

    const result = await useCase.execute({ counterId: 'default', amount: 2 });

    expect(result.counterId).toBe('default');
    expect(result.value).toBe(3);
    expect(counterRepository.save).toHaveBeenCalledTimes(1);
    expect(counterRepository.save).toHaveBeenCalledWith(counter);
  });

  it('rejects invalid increment amounts', async () => {
    const counterRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    const counterPolicy = new CounterPolicy();
    const useCase = new IncrementCounterUseCase(counterRepository as never, counterPolicy);

    await expect(useCase.execute({ counterId: 'default', amount: 0 })).rejects.toThrow(
      'Increment amount must be an integer between 1 and 100.',
    );
    expect(counterRepository.findById).not.toHaveBeenCalled();
  });
});
