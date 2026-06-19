import type { BlockProcessedData } from './mergeWidgetProps';

export interface BlockVisibilityResult {
  isHidden: boolean;
  visibilityClass: string;
}

export function resolveBlockVisibility(
  data: BlockProcessedData,
  options: {
    isDevMode: boolean;
    contentContext?: unknown;
  }
): BlockVisibilityResult {
  const { processedProps, config } = data;
  const { isDevMode, contentContext } = options;

  if (isDevMode) {
    return { isHidden: false, visibilityClass: '' };
  }

  const hidden = config.hidden ?? processedProps.hidden;
  if (hidden) {
    return { isHidden: true, visibilityClass: '' };
  }

  const target = config.visibilityTarget ?? processedProps.visibilityTarget;
  let visibilityClass = '';
  if (target === 'mobile') visibilityClass = 'md:hidden block';
  if (target === 'desktop') visibilityClass = 'hidden md:block';

  const visibilityRule = config.visibilityRule;
  if (visibilityRule) {
    try {
      const fn = new Function(
        'context',
        `with(context) { return ${visibilityRule}; }`
      );
      const isVisible = fn({ context: contentContext || {} });
      if (!isVisible) {
        return { isHidden: true, visibilityClass: '' };
      }
    } catch (error) {
      console.warn('Visibility rule execution failed:', error);
    }
  }

  return { isHidden: false, visibilityClass };
}
