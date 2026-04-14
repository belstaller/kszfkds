import { counterController } from '@/interfaces/http/composition/counterModule';

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

        <div className="mt-8 rounded-xl bg-slate-950 p-6">
          <p className="text-sm text-slate-400">Value</p>
          <p className="mt-2 text-6xl font-semibold text-emerald-400">
            {counter ? counter.value : '—'}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {counter
              ? `Updated: ${new Date(counter.updatedAt).toLocaleString()}`
              : 'Loading is unavailable right now. Showing a fallback value.'}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <form action="/api/counter/increment" method="post" className="flex gap-3">
            <input type="hidden" name="counterId" value="default" />
            <input type="hidden" name="amount" value="1" />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-400"
            >
              Increment
            </button>
          </form>
          <p className="text-sm text-slate-400">
            If the counter cannot be loaded, you can still try incrementing it.
          </p>
        </div>

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
