import { getClient } from '@atelierfabien/next-sanity/lib/server';
import groq from 'groq';

import { get, map } from '@atelierfabien/next-foundation/server';

import {
  lexiconLookupPredicate,
  lexiconTranslationPredicate,
  lexiconProjection,
} from '@app/sanity/queries';

import { locales, defaultLocale } from '@root/i18n';

const client = getClient(true);

export async function fetchLookupLexicons() {
  const query = groq`*[${lexiconLookupPredicate}]{ ${lexiconProjection} }`;
  const lexicons = await client.fetch(query);

  return lexicons.reduce((m, lexicon) => {
    m[lexicon.alias] = {
      ...lexicon,
      entries: map(lexicon.entries, 'alias'),
      lookup: lexicon.entries.reduce((mm, entry) => {
        mm[entry.alias] = entry;
        return mm;
      }, {}),
    };
    return m;
  }, {});
}

export async function fetchLexiconsTranslations() {
  const query = groq`*[${lexiconTranslationPredicate}]{ ${lexiconProjection} }`;
  const lexicons = await client.fetch(query);

  const translations = locales.reduce((memo, locale) => {
    memo[locale] = lexicons.reduce((m, lexicon) => {
      m[lexicon.alias] = lexicon.entries.reduce((mm, entry) => {
        mm[entry.alias] = get(
          entry,
          ['i18n', locale, 'label'],
          get(entry, ['i18n', defaultLocale, 'label'])
        );
        return mm;
      }, {});
      return m;
    }, {});
    return memo;
  }, {});

  return translations;
}
