import { AppWindow, Target, Palette, Scan, Bug, Map, Beaker, LayoutTemplate, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';

export const BUSINESS_WORKSPACE_TABS = [
  { id: 'content', icon: AppWindow, label: 'Page Builder' },
  { id: 'cms', icon: LayoutTemplate, label: 'CMS и Виджеты' },
  { id: 'brand', icon: Palette, label: 'Брендинг' },
  { id: 'prototypes', icon: Lightbulb, label: 'Прототипы' },
  { id: 'ai', icon: Sparkles, label: 'AI Модели' },
  { id: 'evolution', icon: TrendingUp, label: 'Эволюция' },
  { id: 'funnels', icon: Target, label: 'SEO и Воронки' },
] as const;

export const DEVELOPER_WORKSPACE_TABS = [
  { id: 'xray', icon: Scan, label: 'Рентген' },
  { id: 'state', icon: Bug, label: 'Стейт' },
  { id: 'arch', icon: Map, label: 'Архитектура' },
  { id: 'labs', icon: Beaker, label: 'Лаборатория' },
] as const;
