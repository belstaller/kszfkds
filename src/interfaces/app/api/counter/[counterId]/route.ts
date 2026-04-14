import { NextResponse } from 'next/server';
import { counterController } from '@/interfaces/http/composition/counterModule';

interface RouteContext {
  params: {
    counterId: string;
  };
}

export async function GET(_: Request, context: RouteContext) {
  try {
    const result = await counterController.get(context.params.counterId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    const status = message === 'Counter not found.' ? 404 : message === 'Invalid counter id.' ? 400 : 400;

    return NextResponse.json({ message }, { status });
  }
}
