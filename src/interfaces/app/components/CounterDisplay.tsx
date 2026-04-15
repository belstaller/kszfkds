'use client';

import { useState } from 'react';
import { IncrementButton } from './IncrementButton';

interface CounterDisplayProps {
  initialValue: number | null;
  initialUpdatedAt: string | null;
  counterId: string;
}

export function CounterDisplay({
  initialValue,
  initialUpdatedAt,
  counterId,
}: CounterDisplayProps) {
  const [value, setValue] = useState<number | null>(initialValue);
  const [updatedAt, setUpdatedAt] = useState<string | null>(initialUpdatedAt);

  function handleIncrementSuccess(newValue: number, newUpdatedAt: string) {
    setValue(newValue);
    setUpdatedAt(newUpdatedAt);
  }

  const hasValue = value !== null;

  return (
    <>
      <div className="mt-8 rounded-xl bg-slate-950 p-6">
        <p className="text-sm text-slate-400">Value</p>
        <p
          aria-live="polite"
          aria-atomic="true"
          aria-label={hasValue ? `Counter value: ${value}` : 'Counter value unavailable'}
          className="mt-2 text-6xl font-semibold text-emerald-400"
        >
          {hasValue ? value : '—'}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {hasValue
            ? `Updated: ${new Date(updatedAt!).toLocaleString()}`
            : 'Counter data is currently unavailable.'}
        </p>
      </div>

      <div className="mt-8">
        <IncrementButton counterId={counterId} onSuccess={handleIncrementSuccess} />
      </div>
    </>
  );
}
