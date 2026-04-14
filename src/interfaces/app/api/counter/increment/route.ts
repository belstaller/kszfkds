import { NextRequest, NextResponse } from 'next/server';
import { counterController } from '@/interfaces/http/composition/counterModule';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';

    const payload = contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

    const amount = Number(payload.amount ?? 1);
    const result = await counterController.increment({
      counterId: String(payload.counterId ?? 'default'),
      amount,
    });

    if (!contentType.includes('application/json')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    const status =
      message === 'Counter not found.' || message === 'Failed to load counter from PostgreSQL.'
        ? 404
        : message === 'Invalid increment payload.' || message.includes('Increment amount')
          ? 400
          : 500;

    return NextResponse.json(
      {
        message:
          status === 500
            ? 'We could not update the counter right now. Please try again.'
            : message,
      },
      { status },
    );
  }
}
