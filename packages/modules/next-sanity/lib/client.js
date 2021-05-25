import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from 'next-sanity';

import serializers from './serializers';

import sanityConfig from './config';

// eslint-disable-next-line unused-imports/no-unused-vars
const { token, ...config } = sanityConfig;

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 * */
export const urlFor = source => createImageUrlBuilder(config).image(source);

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  serializers,
});

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
});

// Helper function for easily switching between normal client and preview client
export const getClient = usePreview =>
  usePreview ? previewClient : sanityClient;
