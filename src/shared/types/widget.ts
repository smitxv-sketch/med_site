import React from 'react';
import { PageBlock } from './block';

export interface WidgetPropOption {
  value: string;
  label: string;
}

export interface WidgetPropSchema {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'select';
  options?: WidgetPropOption[];
  defaultValue?: any;
  placeholder?: string;
  description?: string;
  // Namespace into which this property is saved by default in WidgetEditor
  namespace?: 'content' | 'design' | 'config';
}

export interface WidgetDefinition {
  type: string;
  title: string;
  description: string;
  props: WidgetPropSchema[];
  icon?: React.ReactNode;
  variants?: readonly string[];
}
