import groq from 'groq';

export const lexiconPredicate = groq`_type == 'lexicon'`;

export const lexiconLookupPredicate = groq`${lexiconPredicate} && lookup`;

export const lexiconTranslationPredicate = groq`${lexiconPredicate} && translation`;

export const lexiconProjection = groq`
  'alias': alias.current, i18n,
  'entries': coalesce(entries[] {
    'alias': alias.current, i18n, value,
    'options': coalesce(options, {})
  }, [])
`;
