import { Counter } from '@/domain/entities/Counter';
import { CounterRepository } from '@/domain/repositories/CounterRepository';
import { CounterValue } from '@/domain/value-objects/CounterValue';
import { getPostgresPool } from '../database/postgres';

interface CounterRow {
  id: string;
  value: number;
  updated_at: Date;
}

export class PostgresCounterRepository implements CounterRepository {
  public async findById(id: string): Promise<Counter | null> {
    try {
      const pool = getPostgresPool();
      const result = await pool.query<CounterRow>(
        'SELECT id, value, updated_at FROM counters WHERE id = $1 LIMIT 1',
        [id],
      );

      const row = result.rows[0];

      if (!row) {
        return null;
      }

      return new Counter(row.id, new CounterValue(row.value), new Date(row.updated_at));
    } catch {
      throw new Error('Failed to load counter from PostgreSQL.');
    }
  }

  public async save(counter: Counter): Promise<void> {
    try {
      const pool = getPostgresPool();
      await pool.query(
        `INSERT INTO counters (id, value, updated_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (id)
         DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at`,
        [
          counter.getId(),
          counter.getValue().getValue(),
          counter.getUpdatedAt().toISOString(),
        ],
      );
    } catch {
      throw new Error('Failed to persist counter to PostgreSQL.');
    }
  }
}