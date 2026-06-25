import type { Core } from '@strapi/strapi';
import {
  DEFAULT_CHEL_SOCIAL_LINKS,
  DEFAULT_ENGINE_STATE,
  DEFAULT_FOOTER_CONTENT,
  SYSTEM_DESIGN_PRESETS,
} from '@med-site/contracts';

const TENANT_LOCALES = [
  { code: 'ru-chel', name: 'Челябинск' },
  { code: 'ru-spb', name: 'Санкт-Петербург' },
];

const PUBLIC_UIDS = [
  'api::page.page',
  'api::global-layout.global-layout',
  'api::navigation.navigation',
  'api::global-setting.global-setting',
  'api::site-theme.site-theme',
  'api::design-preset.design-preset',
] as const;

async function ensureLocales(strapi: Core.Strapi) {
  const localeService = strapi.plugin('i18n').service('locales');
  const existing = await localeService.find();
  const codes = new Set(existing.map((l: { code: string }) => l.code));
  let defaultSet = existing.some((l: { isDefault?: boolean }) => l.isDefault);

  for (const loc of TENANT_LOCALES) {
    if (!codes.has(loc.code)) {
      const isDefault = !defaultSet && loc.code === 'ru-chel';
      await localeService.create({
        code: loc.code,
        name: loc.name,
        isDefault,
      });
      if (isDefault) defaultSet = true;
      strapi.log.info(`[bootstrap] locale created: ${loc.code}${isDefault ? ' (default)' : ''}`);
    }
  }
}

/** Публичное чтение API для фронта/BFF */
async function ensurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[bootstrap] public role not found');
    return;
  }

  for (const uid of PUBLIC_UIDS) {
    for (const action of ['find', 'findOne'] as const) {
      const actionName = `${uid}.${action}`;
      const exists = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: actionName, role: publicRole.id } });

      if (!exists) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action: actionName, role: publicRole.id },
        });
      }
    }
  }
  strapi.log.info('[bootstrap] public API permissions ensured');
}

async function seedHomePage(strapi: Core.Strapi) {
  const blocks = [
    { __component: 'blocks.hero', widgetType: 'HeroWidget' },
    { __component: 'blocks.promotions', widgetType: 'PromotionsWidget' },
    { __component: 'blocks.special-offers', widgetType: 'SpecialOffersWidget' },
    { __component: 'blocks.directions', widgetType: 'DirectionsWidget' },
    { __component: 'blocks.doctors', widgetType: 'DoctorsWidget' },
    {
      __component: 'blocks.reviews',
      widgetType: 'ReviewsWidget',
      content: { limit: 3 },
    },
  ];

  for (const locale of TENANT_LOCALES) {
    const pageUid = 'api::page.page' as never;
    const existing = await strapi.documents(pageUid).findMany({
      filters: { slug: { $eq: 'home' } } as never,
      locale: locale.code,
    });

    if (existing?.length) continue;

    await strapi.documents(pageUid).create({
      data: {
        title: locale.code === 'ru-chel' ? 'Главная — Челябинск' : 'Главная — СПб',
        slug: 'home',
        seo: {
          metaTitle: 'Клиника «Источник»',
          metaDescription: 'Медицинский центр «Источник» — запись к врачу онлайн',
        },
        blocks,
      } as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded home page for ${locale.code}`);
  }
}

/** Меню сайта — как в BFF mock */
async function seedNavigation(strapi: Core.Strapi) {
  const headerMenu = [
    { label: 'Услуги и цены', url: '/prices' },
    { label: 'Врачи', url: '/doctors' },
    { label: 'Акции', url: '/promotions' },
    { label: 'О клинике', url: '/about' },
    { label: 'Контакты', url: '/contacts' },
  ];

  const footerColumns = [
    {
      title: 'О компании',
      links: [
        { label: 'О клинике', url: '/about' },
        { label: 'Наши врачи', url: '/doctors' },
        { label: 'Вакансии', url: '/vacancies' },
        { label: 'Отзывы', url: '/reviews' },
        { label: 'Контакты', url: '/contacts' },
      ],
    },
    {
      title: 'Пациентам',
      links: [
        { label: 'Услуги и цены', url: '/prices' },
        { label: 'Акции', url: '/promotions' },
        { label: 'Программы', url: '/programs' },
        { label: 'Подготовка к анализам', url: '/preparation' },
        { label: 'Вопрос-ответ', url: '/faq' },
      ],
    },
  ];

  const navUid = 'api::navigation.navigation' as never;

  for (const locale of TENANT_LOCALES) {
    const existing = await strapi.documents(navUid).findFirst({ locale: locale.code });
    if (existing) continue;

    await strapi.documents(navUid).create({
      data: { headerMenu, footerColumns } as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded navigation for ${locale.code}`);
  }
}

/** Контакты и бренд per locale */
async function seedGlobalSetting(strapi: Core.Strapi) {
  const settingUid = 'api::global-setting.global-setting' as never;

  const byLocale: Record<
    string,
    {
      siteName: string;
      contactPhone: string;
      contactEmail: string;
      contactAddress: string;
      brandVoice: string;
      socialLinks?: typeof DEFAULT_CHEL_SOCIAL_LINKS;
      footerSocialTitle?: string;
      footerSocialDescription?: string;
      workingHours?: string;
      legalNotice?: string;
      medicalDisclaimer?: string;
      citySelectorHint?: string;
    }
  > = {
    'ru-chel': {
      siteName: 'Сеть клиник «Источник»',
      contactPhone: '+7 (351) 778-88-87',
      contactEmail: 'info@ci74.ru',
      contactAddress: 'г. Челябинск, ул. 40-летия Победы, 11',
      brandVoice:
        'Профессиональный, экспертный, вызывающий доверие. Избегать клише.',
      socialLinks: DEFAULT_CHEL_SOCIAL_LINKS,
      ...DEFAULT_FOOTER_CONTENT,
    },
    'ru-spb': {
      siteName: 'Клиника «Источник» — СПб',
      contactPhone: '+7 (812) 000-00-00',
      contactEmail: 'spb@example.com',
      contactAddress: 'г. Санкт-Петербург',
      brandVoice: 'Профессиональный тон, без маркетинговой воды.',
      socialLinks: [],
      footerSocialTitle: DEFAULT_FOOTER_CONTENT.footerSocialTitle,
      footerSocialDescription: DEFAULT_FOOTER_CONTENT.footerSocialDescription,
      workingHours: 'Ежедневно с 9:00 до 21:00',
      legalNotice: 'Реквизиты и лицензия — уточняются для филиала СПб.',
      medicalDisclaimer: DEFAULT_FOOTER_CONTENT.medicalDisclaimer,
      citySelectorHint: DEFAULT_FOOTER_CONTENT.citySelectorHint,
    },
  };

  for (const locale of TENANT_LOCALES) {
    const existing = await strapi.documents(settingUid).findFirst({ locale: locale.code });
    if (existing) continue;

    await strapi.documents(settingUid).create({
      data: byLocale[locale.code] ?? byLocale['ru-chel'],
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded global-setting for ${locale.code}`);
  }
}

/** Дописываем соцсети в уже существующий global-setting (prod после миграции схемы) */
async function ensureGlobalSettingSocialLinks(strapi: Core.Strapi) {
  const settingUid = 'api::global-setting.global-setting' as never;

  for (const locale of TENANT_LOCALES) {
    if (locale.code !== 'ru-chel') continue;

    const existing = await strapi.documents(settingUid).findFirst({
      locale: locale.code,
      populate: ['socialLinks'] as never,
    });
    if (!existing) continue;

    const doc = existing as {
      documentId?: string;
      socialLinks?: unknown[];
    };
    if (doc.socialLinks?.length) continue;

    await strapi.documents(settingUid).update({
      documentId: doc.documentId!,
      data: { socialLinks: DEFAULT_CHEL_SOCIAL_LINKS } as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] patched socialLinks for ${locale.code}`);
  }
}

/** Дописываем тексты футера в существующий global-setting после миграции схемы */
async function ensureGlobalSettingFooterFields(strapi: Core.Strapi) {
  const settingUid = 'api::global-setting.global-setting' as never;
  const patchFields = [
    'footerSocialTitle',
    'footerSocialDescription',
    'workingHours',
    'legalNotice',
    'medicalDisclaimer',
    'citySelectorHint',
  ] as const;

  for (const locale of TENANT_LOCALES) {
    const existing = await strapi.documents(settingUid).findFirst({
      locale: locale.code,
    });
    if (!existing) continue;

    const doc = existing as Record<string, unknown> & { documentId?: string };
    const defaults =
      locale.code === 'ru-chel'
        ? DEFAULT_FOOTER_CONTENT
        : {
            footerSocialTitle: DEFAULT_FOOTER_CONTENT.footerSocialTitle,
            footerSocialDescription: DEFAULT_FOOTER_CONTENT.footerSocialDescription,
            workingHours: 'Ежедневно с 9:00 до 21:00',
            legalNotice: 'Реквизиты и лицензия — уточняются для филиала СПб.',
            medicalDisclaimer: DEFAULT_FOOTER_CONTENT.medicalDisclaimer,
            citySelectorHint: DEFAULT_FOOTER_CONTENT.citySelectorHint,
          };

    const data: Record<string, string> = {};
    for (const key of patchFields) {
      if (!doc[key]) data[key] = defaults[key];
    }
    if (!Object.keys(data).length) continue;

    await strapi.documents(settingUid).update({
      documentId: doc.documentId!,
      data: data as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] patched footer fields for ${locale.code}`);
  }
}

/** Header/footer блоки для PrototypeShell */
async function seedGlobalLayout(strapi: Core.Strapi) {
  const layoutUid = 'api::global-layout.global-layout' as never;
  const blocks = {
    headerBlocks: [
      {
        __component: 'blocks.generic-widget',
        widgetType: 'header',
        content: {},
      },
    ],
    footerBlocks: [
      {
        __component: 'blocks.generic-widget',
        widgetType: 'footer',
        content: {},
      },
    ],
    mobileNavBlocks: [],
  };

  for (const locale of TENANT_LOCALES) {
    const existing = await strapi.documents(layoutUid).findFirst({ locale: locale.code });
    if (existing) continue;

    await strapi.documents(layoutUid).create({
      data: blocks as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded global-layout for ${locale.code}`);
  }
}

/** Тема сайта (EngineState) per locale */
async function seedSiteTheme(strapi: Core.Strapi) {
  const themeUid = 'api::site-theme.site-theme' as never;

  for (const locale of TENANT_LOCALES) {
    const existing = await strapi.documents(themeUid).findFirst({ locale: locale.code });
    if (existing) continue;

    await strapi.documents(themeUid).create({
      data: {
        engineState: DEFAULT_ENGINE_STATE,
        activePresetId: 'default',
        draftRevision: 0,
      } as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded site-theme for ${locale.code}`);
  }
}

/** Системные пресеты Command Center (глобальные, не i18n) */
async function seedDesignPresets(strapi: Core.Strapi) {
  const presetUid = 'api::design-preset.design-preset' as never;

  for (const preset of SYSTEM_DESIGN_PRESETS) {
    const existing = await strapi.documents(presetUid).findMany({
      filters: { slug: { $eq: preset.slug } } as never,
    });
    if (existing?.length) continue;

    await strapi.documents(presetUid).create({
      data: {
        name: preset.name,
        slug: preset.slug,
        emoji: preset.emoji,
        description: preset.description,
        engineState: preset.engineState,
        pageBlocks: preset.pageBlocks ?? null,
        tenant: preset.tenant,
        isSystem: preset.isSystem,
      } as never,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded design-preset: ${preset.slug}`);
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.STRAPI_SKIP_BOOTSTRAP === 'true') return;

    try {
      await ensureLocales(strapi);
      await ensurePublicPermissions(strapi);
      await seedHomePage(strapi);
      await seedNavigation(strapi);
      await seedGlobalSetting(strapi);
      await ensureGlobalSettingSocialLinks(strapi);
      await ensureGlobalSettingFooterFields(strapi);
      await seedGlobalLayout(strapi);
      await seedSiteTheme(strapi);
      await seedDesignPresets(strapi);
    } catch (err) {
      strapi.log.error('[bootstrap] failed:', err);
    }
  },
};
