import { resolveWidgetVariants } from '@/shared/lib/widgets/resolveWidgetVariant';
import { EXAMPLE_WIDGET_THEME } from '../config/exampleWidgetTheme';

export interface ExampleWidgetProps {
  title?: string;
  subtitle?: string;
  desktopVariant?: string;
  mobileVariant?: string;
}

/**
 * Шаблон entry-point. Зарегистрируйте в widgetManifest.ts после копирования папки.
 */
export function ExampleWidget({
  title = 'Заголовок',
  subtitle,
  desktopVariant = 'A',
  mobileVariant = 'A',
}: ExampleWidgetProps) {
  const { desktop, mobile } = resolveWidgetVariants(
    { desktopVariant, mobileVariant },
    { defaultValue: 'A', validValues: ['A', 'B'] },
    { defaultValue: 'A', validValues: ['A', 'B'] }
  );

  return (
    <section data-widget="example" data-desktop={desktop} data-mobile={mobile}>
      <h2 className={EXAMPLE_WIDGET_THEME.titleClass}>{title}</h2>
      {subtitle && (
        <p className={EXAMPLE_WIDGET_THEME.subtitleClass}>{subtitle}</p>
      )}
    </section>
  );
}
