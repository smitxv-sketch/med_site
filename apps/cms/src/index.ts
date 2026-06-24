import type { Core } from '@strapi/strapi';

const TENANT_LOCALES = [
  { code: 'ru-chel', name: 'Челябинск' },
  { code: 'ru-spb', name: 'Санкт-Петербург' },
];

const PUBLIC_UIDS = [
  'api::page.page',
  'api::global-layout.global-layout',
  'api::navigation.navigation',
  'api::global-setting.global-setting',
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
  ];

  const navUid = 'api::navigation.navigation' as never;

  for (const locale of TENANT_LOCALES) {
    const existing = await strapi.documents(navUid).findFirst({ locale: locale.code });
    if (existing) continue;

    await strapi.documents(navUid).create({
      data: { headerMenu, footerColumns: [] } as never,
      locale: locale.code,
      status: 'published',
    });
    strapi.log.info(`[bootstrap] seeded navigation for ${locale.code}`);
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

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.STRAPI_SKIP_BOOTSTRAP === 'true') return;

    try {
      await ensureLocales(strapi);
      await ensurePublicPermissions(strapi);
      await seedHomePage(strapi);
      await seedNavigation(strapi);
      await seedGlobalLayout(strapi);
    } catch (err) {
      strapi.log.error('[bootstrap] failed:', err);
    }
  },
};
