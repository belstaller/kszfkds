'use client';

import { useState } from 'react';

interface IncrementButtonProps {
  counterId: string;
  onSuccess: (value: number, updatedAt: string) => void;
}

export function IncrementButton({ counterId, onSuccess }: IncrementButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleIncrement() {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch('/api/counter/increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ counterId, amount: 1 }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? 'Failed to increment the counter.');
      }

      const data = await response.json();
      onSuccess(data.value, data.updatedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleIncrement}
        disabled={isPending}
        aria-busy={isPending}
        className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Incrementing…' : 'Increment'}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      {!error && (
        <p className="text-sm text-slate-400">
          Each click adds 1 to the counter.
        </p>
      )}
    </div>
  );
}
