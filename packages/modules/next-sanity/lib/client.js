import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from 'next-sanity';

import { useState, useEffect } from 'react';

import serializers from './serializers';

import { deduceItem } from './util';

import sanityConfig from './config';

export * from './query';

// eslint-disable-next-line unused-imports/no-unused-vars
const { token, ...config } = sanityConfig;

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 * */
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const usePreviewProps = (props, fn) => {
  const { previewOptions = {}, ...originalProps } = props;
  const { query, params, initialData, enabled } = previewOptions;

  const [previewProps, setPreviewProps] = useState(initialData);

  const { data } = usePreviewSubscription(query, {
    params,
    initialData,
    enabled,
  });

  useEffect(() => {
    let disposed = false;

    (async () => {
      let currentData = previewOptions?.single ? deduceItem(data, true) : data;

      if (!enabled) return setPreviewProps(currentData);

      if (currentData === undefined || disposed) return;

      if (typeof fn === 'function') {
        currentData = await fn(
          currentData,
          props,
          previewOptions?.context ?? {}
        );
      }

      if (currentData === undefined || disposed) return;

      setPreviewProps(currentData);
    })();

    return () => {
      disposed = true;
    };
  }, [
    enabled,
    data,
    props,
    fn,

    previewOptions?.context,
    previewOptions?.single,
  ]);

  if (enabled) {
    return {
      ...originalProps,
      ...previewProps,
      page: previewProps.currentPageProps,
    };
  } else {
    return originalProps;
  }
};

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
