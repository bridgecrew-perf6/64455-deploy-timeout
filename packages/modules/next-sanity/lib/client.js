import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
} from 'next-sanity';

import serializers from './serializers';

import sanityConfig from './config';

export * from './query';

export * from './hooks';

// eslint-disable-next-line unused-imports/no-unused-vars
const { token, ...config } = sanityConfig;

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 * */
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up Portable Text serialization
const PortableTextComponent = createPortableTextComponent({
  ...config,
  serializers,
});

export const PortableText = ({ blocks, ...props }) => {
  blocks = [].concat(blocks || []).map((block) => {
    if (block._type === 'block.content') {
      return { ...block, _type: 'block' };
    }
    return block;
  });
  return <PortableTextComponent blocks={blocks} {...props} />;
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;
