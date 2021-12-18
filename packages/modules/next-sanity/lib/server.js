import { createClient } from 'next-sanity';

import sanityConfig from './config';

export { default as groq } from 'groq';

export { default as DataLoader } from 'dataloader';

export * from './tree';

// eslint-disable-next-line unused-imports/no-unused-vars
const { token, ...config } = sanityConfig;

export { createClient, config };

export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
});

export const publicClient = createClient({
  ...config,
});

// Helper function for easily switching between normal client and public client
export const getClient = useToken => (useToken ? sanityClient : publicClient);

const handleApiRequest = (req, res, fn) => {
  if (!req?.query?.secret) {
    return res.status(401).json({ message: 'No secret token' });
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' });
  }

  if (!req.query.source) {
    return res.status(401).json({ message: 'No source URL' });
  }

  fn();
};

export function previewRequestHandler(options = {}) {
  const { data = {}, options: previewOptions, fn } = options;
  return async (req, res) => {
    handleApiRequest(req, res, async () => {
      const previewData = typeof fn === 'function' ? await fn(req, res) : data;
      res.setPreviewData(
        previewData,
        previewOptions ?? { maxAge: 60 * 60 * 24 }
      );
      res.writeHead(307, {
        Location: req?.query?.source ?? options.redirect ?? '/',
      });
      res.end();
    });
  };
}

export function exitRequestHandler(options = {}) {
  return (req, res) => {
    if (req.preview) {
      res.clearPreviewData();
      res.writeHead(307, {
        Location: req?.query?.source ?? options.redirect ?? '/',
      });
    } else {
      res.writeHead(307, { Location: options.redirect ?? '/' });
    }
    res.end();
  };
}
