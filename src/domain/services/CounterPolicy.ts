export class CounterPolicy {
  public ensureIncrementAmount(amount: number): void {
    if (!Number.isInteger(amount) || amount <= 0 || amount > 100) {
      throw new Error('Increment amount must be an integer between 1 and 100.');
    }
  }
}