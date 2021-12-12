import groq from 'groq';

import { locales } from '@root/i18n';

import {
  assetProjection,
  basePropertyTypeProjection,
  fragmentsProjection,
} from '.';

const localizedFragments = locales
  .reduce((memo, locale) => {
    const lc = JSON.stringify(locale);
    memo.push(`${lc}: ${fragmentsProjection.replace(/\$locale/g, lc)}`);
    return memo;
  }, [])
  .join(', ');

export const settingsProjection = groq`
  'base': *[_type == 'settings.site'][0] {
    'id': alias.current,
    'name': i18n[$defaultLocale].name,
    'baseUrl': url,
    'fragments': { 'i18n': { ${localizedFragments} } },
    i18n, social
  },
  'site': *[_type == 'settings.site'][0] {
    'assets': coalesce(assets[]{
      ..., ...@-> 
    }{ ..., 'asset': file.asset-> { ${assetProjection} } }, []),
  },
  'shop': *[_type == 'settings.shop'][0]{
    'address': address{ name, title, street, postalCode, city, country },
    'location': location{ lat, lng },
    'contact': [
      { '_key': 'a1a1a1aa111a', 'type': 'phone', 'value': contact.phone },
      { '_key': 'b2b2b2bb222b', 'type': 'email', 'value': contact.email },
      ...coalesce(contact.list[]{ _key, type, value }, [])
    ],
    'social': coalesce(social.list[]{ type, value }, []),
    'openingHours': openingHours[active]{ day, from, to, closed }|order(day, from),
    'properties': coalesce(properties[]->{
      ${basePropertyTypeProjection}, i18n
    }, []),
    'snipcart': snipcart { publicKey, 'version': coalesce(version, '3.2.0') },
  },
  'search': *[_type == 'settings.search'][0]{
    'algolia': algolia{ id, publicKey },
    refinements
  },
  'config': *[_type == 'settings.advanced'][0].config,
  'homepage': *[_type == 'settings.homepage'][0] {
    'banner': banner._ref,
    'collection': collection._ref,
    'page': page._ref,
  }
`;

export const currencySettingsPipeline = groq`{
  'currency': *[_type == 'settings.shop'][0].currency->{ code, i18n },
  'currencies': *[_type == 'settings.shop'][0].currencies[]->{
    code, i18n, 'rate': rate.current
  },
}`;
