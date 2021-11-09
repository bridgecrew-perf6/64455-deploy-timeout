import algoliasearch from 'algoliasearch';
import indexer from 'sanity-algolia';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import { isBlank, isEmpty, toBoolean } from '@foundation/server';

import { locales, defaultLocale } from '@root/i18n';

import initialize from './product';

// NOTE the webhook should look like this:
//
// http://example.com/api/algolia/webhook/en?token=secret
// http://example.com/api/algolia/webhook/nl?token=secret
//
// In order to perform a full re-index, append: &replace=true
//
// http://example.com/api/algolia/webhook/en?token=secret&replace=true
//
// To reindex all locales, hit the root endpoint like this:
//
// http://example.com/api/algolia/webhook?token=secret

const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaAdminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;
const algoliaWebhookToken = process.env.ALGOLIA_WEBHOOK_TOKEN;
const algoliaIndexBasename = process.env.ALGOLIA_INDEX_BASENAME;

if (isBlank(algoliaAppId))
  throw new Error('Invalid env value for: ALGOLIA_APP_ID');
if (isBlank(algoliaAdminApiKey))
  throw new Error('Invalid env value for: ALGOLIA_ADMIN_API_KEY');
if (isBlank(algoliaWebhookToken))
  throw new Error('Invalid env value for: ALGOLIA_WEBHOOK_TOKEN');
if (isBlank(algoliaIndexBasename))
  throw new Error('Invalid env value for: ALGOLIA_INDEX_BASENAME');

const sanity = getClient(true);

const algolia = algoliasearch(algoliaAppId, algoliaAdminApiKey);

const products = initialize(sanity);

export async function handleWebhookRequest(req, res, allLocales = false) {
  const locale = req.query.locale ?? '';
  const replace = allLocales || toBoolean(req.query.replace);
  const token = req.query.token ?? '';
  const valid =
    (allLocales || locales.includes(locale)) && algoliaWebhookToken === token;

  try {
    if (valid && req.method === 'GET' && replace) {
      if (allLocales) {
        const results = await Promise.all(
          locales.map(async locale => {
            return performFullUpdate(locale);
          })
        );
        res.status(200).json(results);
      } else {
        const result = await performFullUpdate(locale);
        res.status(200).json(result);
      }
    } else if (
      valid &&
      req.method === 'POST' &&
      req.headers['content-type'] === 'application/json' &&
      typeof req.body?.ids === 'object' &&
      !isEmpty(req.body?.ids)
    ) {
      const result = await performIncrementalUpdate(locale, req.body);
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: 'Invalid webhook request' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function performFullUpdate(locale) {
  const indexer = await getIndexer(locale);
  const records = await indexer.replaceAll(sanity);
  return { locale, replace: true, count: records.length };
}

export async function performIncrementalUpdate(locale, payload = {}) {
  const indexer = await getIndexer(locale);
  const records = await indexer.webhookSync(sanity, payload);
  const data = { locale, replace: false, count: records.length };
  return data;
}

export function getIndex(locale = defaultLocale) {
  if (locales.includes(locale)) {
    return algolia.initIndex(`${algoliaIndexBasename}_${locale}`);
  } else {
    throw new Error(`Invalid locale: ${locale}`);
  }
}

export async function getIndexer(locale = defaultLocale) {
  const algoliaIndex = getIndex(locale);
  return products.getIndexer(indexer, algoliaIndex, locale);
}
