import { createClient } from 'next-sanity';

import sanityConfig from './config';

export { default as groq } from 'groq';

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
