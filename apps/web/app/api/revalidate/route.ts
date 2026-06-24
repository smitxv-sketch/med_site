import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token');
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const model = body?.model as string | undefined;

  const tags = ['pages', 'tenant:chel', 'tenant:spb'];
  if (model === 'page') tags.push('page:home');

  tags.forEach((tag) => revalidateTag(tag));
  revalidatePath('/');

  return NextResponse.json({ revalidated: true, tags });
}
