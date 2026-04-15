import { counterController } from '@/interfaces/http/composition/counterModule';
import { CounterDisplay } from './components/CounterDisplay';

async function getCounterState() {
  try {
    return await counterController.get('default');
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const counter = await getCounterState();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Counter</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Current value</h1>
        <p className="mt-4 text-slate-300">Use the button below to increment the counter.</p>

        <CounterDisplay
          counterId="default"
          initialValue={counter ? counter.value : null}
          initialUpdatedAt={counter ? counter.updatedAt : null}
        />

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
          <p className="font-medium text-white">Basic states</p>
          <p className="mt-2">
            Loading failures fall back to a safe empty view. API errors return a user-friendly
            message.
          </p>
        </div>
      </div>
    </main>
  );
}
