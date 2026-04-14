import { CounterController } from './counterController';

describe('CounterController', () => {
  it('rejects invalid get input without calling the use case', async () => {
    const getCounterUseCase = {
      execute: jest.fn(),
    };
    const incrementCounterUseCase = {
      execute: jest.fn(),
    };

    const controller = new CounterController(getCounterUseCase as never, incrementCounterUseCase as never);

    await expect(controller.get('')).rejects.toThrow();
    expect(getCounterUseCase.execute).not.toHaveBeenCalled();
  });

  it('rejects invalid increment payloads without calling the use case', async () => {
    const getCounterUseCase = {
      execute: jest.fn(),
    };
    const incrementCounterUseCase = {
      execute: jest.fn(),
    };

    const controller = new CounterController(getCounterUseCase as never, incrementCounterUseCase as never);

    await expect(controller.increment({ counterId: '', amount: -1 })).rejects.toThrow();
    expect(incrementCounterUseCase.execute).not.toHaveBeenCalled();
  });
});
