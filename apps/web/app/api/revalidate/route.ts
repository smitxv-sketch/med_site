import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token');
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const model = body?.model as string | undefined;
  const pageSlug = body?.pageSlug as string | undefined;
  const tagsFromBody = Array.isArray(body?.tags) ? (body.tags as string[]) : [];
  const pathsFromBody = Array.isArray(body?.paths) ? (body.paths as string[]) : [];

  const tags = new Set<string>(tagsFromBody);

  // Safe fallbacks if a webhook/tool calls without tags
  if (tags.size === 0) {
    tags.add('pages');
    tags.add('site-theme');
    if (model === 'page' && pageSlug) tags.add(`page:${pageSlug}`);
  }

  tags.forEach((tag) => revalidateTag(tag));
  if (pathsFromBody.length) {
    pathsFromBody.forEach((p) => revalidatePath(p));
  } else if (model === 'page' && pageSlug === 'home') {
    revalidatePath('/');
  }

  return NextResponse.json({ revalidated: true, tags: Array.from(tags) });
}
