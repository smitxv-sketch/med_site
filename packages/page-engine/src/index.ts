import type { PageBlock } from '@med-site/contracts';

export interface BlockRendererProps {
  blocks: PageBlock[];
  contentContext?: unknown;
}

export { PAGE_ENGINE_VERSION } from './version.js';
