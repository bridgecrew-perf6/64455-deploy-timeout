import { Router, useRouter as useNextRouter } from 'next/router';
import { pick, isEqual } from 'lodash-es';

import { usePrevious } from './hooks';
import { usePageOptions } from './page';

export { Router };

const ROUTER_KEYS = [
  'pathname',
  'asPath',
  'basePath',
  'defaultLocale',
  'isFallback',
  'isLocaleDomain',
  'isPreview',
  'locale',
  'locales',
  'query',
  'route',
];

export function useRouter() {
  const { router: page = {} } = usePageOptions();
  const router = useNextRouter();

  const previous = usePrevious(pick(router, ROUTER_KEYS), {
    shouldChange: (prev, next) => {
      return !isEqual(pick(prev, ROUTER_KEYS), pick(next, ROUTER_KEYS));
    },
    fallback: router,
  });

  router.previousState = previous;
  router.page = page;
  return router;
}
