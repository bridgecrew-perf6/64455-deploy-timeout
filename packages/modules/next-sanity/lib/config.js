import defaults from 'lodash.defaults';

import sanityConfig from '@app/config/sanity';

const config = defaults(
  {
    /**
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     *
     * https://nextjs.org/docs/basic-features/environment-variables
     * */
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_TOKEN,
  },
  { ...sanityConfig },
  {
    /**
     * Define the API version to use.
     *
     * https://www.sanity.io/docs/api-versioning
     */
    apiVersion: '2021-03-25',
    /**
     * Set useCdn to `false` if your application require the freshest possible
     * data always (potentially slightly slower and a bit more expensive).
     * Authenticated request (like preview) will always bypass the CDN
     * */
    useCdn: process.env.NODE_ENV === 'production',
  }
);

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}

if (!config.dataset) {
  throw Error('The dataset name is not set. Check your environment variables.');
}

export default config;
