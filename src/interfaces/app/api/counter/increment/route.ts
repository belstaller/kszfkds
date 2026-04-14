import { NextRequest, NextResponse } from 'next/server';
import { counterController } from '@/interfaces/http/composition/counterModule';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';

    const payload = contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

    const result = await counterController.increment({
      counterId: String(payload.counterId ?? 'default'),
      amount: Number(payload.amount ?? 1),
    });

    if (!contentType.includes('application/json')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    const status =
      message === 'Counter not found.' ? 404 : message.includes('Increment amount') ? 400 : 400;

    return NextResponse.json({ message }, { status });
  }
}
