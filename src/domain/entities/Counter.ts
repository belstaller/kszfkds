import { CounterValue } from '../value-objects/CounterValue';

export class Counter {
  constructor(
    private readonly id: string,
    private value: CounterValue,
    private updatedAt: Date,
  ) {
    if (!id.trim()) {
      throw new Error('Counter id is required.');
    }
  }

  public getId(): string {
    return this.id;
  }

  public getValue(): CounterValue {
    return this.value;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public increment(amount: number): void {
    this.value = this.value.add(amount);
    this.updatedAt = new Date();
  }
}