import { cn } from '@/lib/utils';

/** HTML из CMS/MODX — обёртка prose, без лишней логики */
export function CmsHtml({
  html,
  className,
}: {
  html?: string | null;
  className?: string;
}) {
  const trimmed = String(html ?? '').trim();
  if (!trimmed) return null;
  return (
    <div
      className={cn(
        'prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: trimmed }}
    />
  );
}
