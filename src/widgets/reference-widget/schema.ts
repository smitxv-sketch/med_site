import { WidgetDefinition } from '@/shared/types/widget';

export const ReferenceWidgetSchema: WidgetDefinition = {
  type: 'ReferenceWidget',
  title: 'Ссылочный блок (Reference)',
  description: 'Позволяет встроить глобальный блок по его ID.',
  props: [
    {
      name: 'refId',
      label: 'ID глобального блока',
      type: 'string',
      namespace: 'config'
    }
  ]
};
