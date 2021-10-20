import { useEffect, useState } from 'react';
import { extract } from '@sanity/mutator';
import debounce from 'lodash.debounce';

import { createClient, createPreviewSubscriptionHook } from 'next-sanity';

import { usePage } from '@atelierfabien/next-foundation';

import { deduceItem, processData } from './util';

import sanityConfig from './config';

// eslint-disable-next-line unused-imports/no-unused-vars
const { token, ...config } = sanityConfig;

const sanityClient = createClient({
  ...config,
  useCdn: false,
  withCredentials: true,
});

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

const usePreviewData = (data, props, options = {}) => {
  const { fn } = options;
  const { previewOptions = {}, ...originalProps } = props;
  const { initialData, enabled } = previewOptions;

  const [previewProps, setPreviewProps] = useState(initialData);

  useEffect(() => {
    let disposed = false;

    (async () => {
      let currentData = processData(
        previewOptions?.single ? deduceItem(data, true) : data
      );

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

  const page =
    previewProps?.currentPageProps ?? originalProps?.currentPageProps;

  usePage((context) => {
    context.reset(page ?? {});
  });

  if (enabled) {
    return {
      ...originalProps,
      ...previewProps,
      page,
    };
  } else {
    return { ...originalProps, page };
  }
};

export const useListeningQuery = (query, config = {}) => {
  const { params = {}, initialData, enabled = false, delay = 1000 } = config;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Find the ids of documents we want to listen to changes on
  // Maybe: Should include draft.ids of each as well?
  const references = extract(`.._ref`, initialData);
  const ids = extract(`.._id`, initialData);

  const docIds = Array.from(new Set([...references, ...ids]))
    .filter((id) => !id.startsWith('image-') && !id.startsWith('file-'))
    .reduce((memo, id) => memo.concat(id, `drafts.${id}`), []);

  function fetchData() {
    // This isn't a great place to put this because it only triggers when fetch starts,
    // Not when listener starts receiving updates
    // Perhaps we could have isListening + isLoading
    setLoading(true);

    // Listener client uses credentials to fetch draft content
    sanityClient.fetch(query, params).then((newData) => {
      setData(newData);
      setLoading(false);
    });
  }

  useEffect(() => {
    let subscription;

    if (enabled) {
      fetchData(); // initial fetch

      // We're not listening to the passed-in query
      // We listen for changes on any of the initialData's _id's and _ref's
      subscription = sanityClient
        .listen(`*[_id in $docIds]`, { docIds }, { includeResult: false })
        .subscribe(
          debounce(() => {
            fetchData();

            // For some reason it helps to have a delayed additional fetch
            // The last keystroke doesn't always trigger a refetch
            // TODO: Understand why and fix this
            setTimeout(() => {
              // console.log(`Debounced extra fetch`)
              fetchData();
            }, delay);
          }, delay)
        );
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return { data, loading };
};

export const usePreviewProps = (props, options = {}) => {
  const { previewOptions = {} } = props;
  const { query, params, initialData, enabled } = previewOptions;

  const { data } = usePreviewSubscription(query, {
    params,
    initialData,
    enabled,
  });

  return usePreviewData(data, props, options);
};

export const usePreviewQueryProps = (props, options = {}) => {
  const { previewOptions = {} } = props;
  const { query, params, initialData, enabled, delay } = previewOptions;

  const { data } = useListeningQuery(query, {
    params,
    initialData,
    enabled,
    delay,
  });

  return usePreviewData(data, props, options);
};
