# @med-site/contracts

SSOT for shared types, tenant config, and API contracts (Wave 1+).

## Tenant resolution

Tenants represent city variants (Strapi locales), not languages.

```ts
import { resolveTenant } from '@med-site/contracts';

const { tenant, strippedPathname } = resolveTenant({
  host: 'chel.example.ru',
  pathname: '/doctors',
});
// tenant.strapiLocale === 'ru-chel'
```

Path-prefix example (`/spb/...`):

```ts
resolveTenant({ host: 'example.ru', pathname: '/spb/services' });
// tenant.id === 'spb', strippedPathname === '/services'
```

Query `?city=...` is never used for indexed pages.
