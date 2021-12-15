import { getClient } from '@atelierfabien/next-sanity';

import init from '@app/sanity/server/product';

import { defaultLocale } from '@root/i18n';

const { serializeByCategory } = init(getClient());

export default async (req, res) => {
  const { term, path = [], locale = defaultLocale } = req.query;
  const data = await serializeByCategory(path, locale, {
    term,
    distinct: true,
  });
  res.status(200).json(data ?? []);
};
