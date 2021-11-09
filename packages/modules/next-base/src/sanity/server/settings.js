import groq from 'groq';

import {
  getClient,
  processResults,
} from '@atelierfabien/next-sanity/lib/server';

import { set } from '@atelierfabien/next-foundation/server';

import { defaultLocale } from '@root/i18n';

import { settingsProjection } from '@app/sanity/queries';

export const fetchSettings = async () => {
  const data = await getClient(true).fetch(
    groq`{
    ${settingsProjection}
  }`,
    {
      defaultLocale,
    }
  );
  const { fragments = {}, ...base } = data?.base ?? {};
  const processed = processResults({ ...data, base, fragments });
  if (process.env.ALGOLIA_INDEX_BASENAME) {
    set(
      processed,
      ['search', 'algolia', 'indexBasename'],
      process.env.ALGOLIA_INDEX_BASENAME
    );
  }
  return processed;
};
