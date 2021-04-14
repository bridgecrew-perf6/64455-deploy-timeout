import { useMemo } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import site from '@app/config/site';
import { simplifyLocale } from './util';

export function useSite() {
  return { ...site };
}

export function useLocale() {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const locale = router.locale || 'en';
  const lc = simplifyLocale(locale);
  const language = t(
    `common:languages.${locale}`,
    {},
    { fallback: [`languages.${lc}`] }
  );

  const locales = useMemo(() => {
    return [].concat(router.locales || []).map(code => {
      const isDefault = code === router.defaultLocale;
      // eslint-disable-next-line no-shadow
      const lang = simplifyLocale(code);
      const name = t(
        `common:languages.${code}`,
        {},
        { fallback: [`common:languages.${lang}`] }
      );
      const href = isDefault ? router.asPath : `/${code}${router.asPath}`;
      return { code, lang, name, active: code === locale, href };
    });
  }, [locale, lang, router.asPath]);

  return { locale, lang: lc, language, locales };
}
