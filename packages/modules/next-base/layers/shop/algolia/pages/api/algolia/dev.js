import { getClient } from '@atelierfabien/next-sanity';

import init from '@app/sanity/server/product';

import { inDevelopment } from '@app/sanity/server';

const { serializeAll } = init(getClient());

export default inDevelopment(async (req, res) => {
  const data = await serializeAll(req.query?.locale);
  res.status(200).json(data ?? {});
});
