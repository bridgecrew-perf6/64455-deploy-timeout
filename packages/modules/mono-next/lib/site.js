import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { canonicalizeLocale, simplifyLocale } from './util';
import site from '@app/config/site';

export * from 'next-seo';

export function useSite() {
  return { ...site };
}

export function useSeo() {
  const router = useRouter();

  return useMemo(() => {
    const { asPath, locale, defaultLocale, locales = [] } = router;
    const { baseUrl, translations, ...defaults } = site;
    const i18n = translations?.[locale] || {};
    const seo = { ...defaults, ...i18n };
    
    function getUrl(lc) {
      return lc === defaultLocale ? 
        `${baseUrl}${asPath}` : `${baseUrl}/${lc}${asPath}`;
    };

    seo.canonical = getUrl(defaultLocale);

    seo.languageAlternates = locales.map((lc) => ({
      hrefLang: lc, href: getUrl(lc)
    }));

    seo.openGraph = {
      ...seo.openGraph,
      locale: canonicalizeLocale(locale, true)
    };

    seo.openGraph.url = getUrl(locale);
    seo.openGraph.alternateLocales = locales.reduce((acc, lc) => {
      if (lc === locale) return acc;
      return acc.concat(canonicalizeLocale(lc, true));
    }, []);

    return seo;
  }, [router.asPath, router.locale]);
}

export function PageSeo({ openGraph, ...props }) {
  // workaround for next-seo#544
  return <NextSeo {...props} openGraph={{...openGraph}}/>
}

export function useLocale() {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const locale = router.locale || 'en';
  const lc = simplifyLocale(locale);
  const language = t(`common:languages.${locale}`, {}, { fallback: [`languages.${lc}`] });

  const locales = useMemo(() => {
    return [].concat(router.locales || []).map((code) => {
      const isDefault = code === router.defaultLocale;
      const lang = simplifyLocale(code);
      const name = t(`common:languages.${code}`, {}, { fallback: [`common:languages.${lang}`] });
      const href = isDefault ? router.asPath : `/${code}${router.asPath}`;
      return { code, lang, name, active: code === locale, href };
    });   
  }, [locale, lang, router.asPath]);

  return { locale, lang: lc, language, locales };
}