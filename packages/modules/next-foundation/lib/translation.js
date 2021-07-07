import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router'; // use standard

import { get, set, simplifyLocale } from './util';

export function useLocale() {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = router.locale ?? router.defaultLocale ?? 'en';
  const lc = simplifyLocale(locale);
  const language = t(
    `common:languages.${locale}`,
    {},
    { fallback: [`languages.${lc}`] }
  );

  const locales = useMemo(() => {
    return [].concat(router.locales || []).map((code) => {
      const isDefault = code === router.defaultLocale;
      // eslint-disable-next-line no-shadow
      const lang = simplifyLocale(code);
      const name = t(
        `common:languages.${code}`,
        {},
        { fallback: [`common:languages.${lang}`] }
      );
      const asPath = isDefault ? router.asPath : `/${code}${router.asPath}`;
      const href = get(router, ['page', 'locales', code], asPath);
      return { code, lang, name, active: code === locale, href };
    });
  }, [router, t, locale]);

  return { locale, lang: lc, language, locales };
}

export function useTranslated(data = {}, forceLocale) {
  const translator = useTranslator(forceLocale);
  return (...path) => translator(data, ...path);
}

export function useTranslator(forceLocale) {
  const router = useRouter();
  const defaultLocale = router.defaultLocale ?? 'en';
  const locale = forceLocale ?? router.locale ?? defaultLocale;

  return useMemo(() => {
    return (data, ...path) => {
      const key = path
        .map((p) => (Array.isArray(p) ? p : String(p).split('.')))
        .flat();
      const defaultKey = [].concat(key);
      defaultKey.splice(-1, 0, 'i18n', defaultLocale);
      const localizedKey = [].concat(key);
      localizedKey.splice(-1, 0, 'i18n', locale);
      return get(
        data,
        localizedKey,
        get(data, defaultKey, key.length > 0 ? get(data, key) : data)
      );
    };
  }, [defaultLocale, locale]);
}

export function mapTranslations(t, mapping = {}) {
  return Object.entries(mapping).reduce(
    (memo, [to, from]) => set(memo, to, t(from)),
    {}
  );
}
