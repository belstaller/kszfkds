import { getCounterUseCase } from '@/interfaces/http/composition/counterModule';

async function getCounterState() {
  try {
    return await getCounterUseCase.execute('default');
  } catch {
    return {
      counterId: 'default',
      value: 0,
      updatedAt: new Date(0).toISOString(),
    };
  }
}

export default async function HomePage() {
  const counter = await getCounterState();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16">
      <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">simple counter</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Clean Architecture starter</h1>
        <p className="mt-4 text-slate-300">
          This scaffold keeps business logic in the domain and application layers while
          Next.js stays in the interfaces layer.
        </p>

        <div className="mt-8 rounded-xl bg-slate-950 p-6">
          <p className="text-sm text-slate-400">Current value</p>
          <p className="mt-2 text-6xl font-semibold text-emerald-400">{counter.value}</p>
          <p className="mt-2 text-xs text-slate-500">
            Counter ID: {counter.counterId} · Updated: {new Date(counter.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <form action="/api/counter/increment" method="post" className="flex flex-1 gap-3">
            <input type="hidden" name="counterId" value="default" />
            <input
              type="number"
              name="amount"
              min="1"
              defaultValue="1"
              className="w-24 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400"
            >
              Increment
            </button>
          </form>
        </div>

        <div className="mt-8 text-sm text-slate-400">
          <p>API endpoints:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>GET /api/counter/default</li>
            <li>POST /api/counter/increment</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
