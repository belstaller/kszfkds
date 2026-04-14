import { GetCounterUseCase } from './GetCounterUseCase';
import { Counter } from '@/domain/entities/Counter';
import { CounterValue } from '@/domain/value-objects/CounterValue';

describe('GetCounterUseCase', () => {
  it('returns the counter state when it exists', async () => {
    const counter = new Counter('default', new CounterValue(4), new Date('2024-01-01T00:00:00.000Z'));
    const counterRepository = {
      findById: jest.fn().mockResolvedValue(counter),
    };

    const useCase = new GetCounterUseCase(counterRepository as never);

    await expect(useCase.execute('default')).resolves.toEqual({
      counterId: 'default',
      value: 4,
      updatedAt: '2024-01-01T00:00:00.000Z',
    });
  });

  it('throws when the counter does not exist', async () => {
    const counterRepository = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const useCase = new GetCounterUseCase(counterRepository as never);

    await expect(useCase.execute('missing')).rejects.toThrow('Counter not found.');
  });
});
