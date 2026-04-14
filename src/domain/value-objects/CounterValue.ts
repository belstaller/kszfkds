export class CounterValue {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Counter value must be an integer.');
    }

    if (value < 0) {
      throw new Error('Counter value cannot be negative.');
    }

    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public add(amount: number): CounterValue {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error('Increment amount must be a positive integer.');
    }

    return new CounterValue(this.value + amount);
  }

  public equals(other: CounterValue): boolean {
    return this.value === other.value;
  }
}