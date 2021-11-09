import { lookup, mergeObjects } from '@atelierfabien/next-foundation/server';
import preval from 'next-plugin-preval';

import seoConfig from '@root/next-seo.config';

import { defaultLocale, locales } from '@root/i18n';

import promise from './app.preval';

async function getData() {
  const config = await promise;

  const name = config.base.name ?? 'example';

  const baseUrl =
    process.env.SITE_URL ??
    config.base.baseUrl ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://example.com');

  const defaults = {
    name,
    baseUrl,
    ...seoConfig,
    openGraph: {
      type: 'website',
      url: baseUrl,
      site_name: name,
      images: [{ url: `${baseUrl}/images/og-image.png` }],
      ...seoConfig?.openGraph,
    },
    cookiePolicy: '/terms/cookies',
    privacyPolicy: '/terms/privacy',
  };

  const image = lookup(config, ['base', 'social', 'image']) ?? null;

  const translations = locales.reduce((memo, locale) => {
    const base = mergeObjects(
      defaults.translations?.[defaultLocale],
      config.base?.i18n?.[defaultLocale]
    );

    const translation = mergeObjects(
      defaults.translations?.[locale],
      config.base?.i18n?.[locale]
    );

    memo[locale] = {
      ...base,
      ...translation,
    };
    return memo;
  }, {});

  return { ...defaults, image, translations };
}

export default preval(getData());
