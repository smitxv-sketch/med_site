export interface BlockDesignParams {
  backgroundColor?: 'default' | 'white' | 'gray' | 'brand' | 'dark' | string;
  paddingTop?: 'none' | 'small' | 'default' | 'large' | string;
  paddingBottom?: 'none' | 'small' | 'default' | 'large' | string;
  layoutPattern?: string;
  intent?: string;
  [key: string]: any;
}

export interface BlockConfigParams {
  hidden?: boolean;
  visibilityTarget?: 'all' | 'mobile' | 'desktop' | string;
  visibilityAuth?: 'all' | 'guest' | 'auth' | string;
  visibilityRule?: string; // Stage 6: Rule engine expressions (e.g. "context.utm_campaign === 'sale'")
  refId?: string; // Stage 6: ID of a global reference block
  [key: string]: any;
}

export interface PageBlock {
  id: string;
  type: string;
  content?: Record<string, any>;
  design?: BlockDesignParams;
  config?: BlockConfigParams;
  children?: PageBlock[]; // Задел на Этап 2
  slots?: Record<string, PageBlock[]>; // Stage 6: Named slots for inversion of control
  bind?: Record<string, string>; // Stage 4: data binding instructions
  variants?: {
    id: string;
    weight: number;
    content?: Record<string, any>;
    design?: BlockDesignParams;
  }[]; // Stage 5: A/B Testing
  
  // Устаревший формат (оставлен временно для совместимости, будем избавляться)
  props?: Record<string, any>;
}
