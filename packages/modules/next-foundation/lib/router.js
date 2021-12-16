import { useEffect } from 'react';
import { Router, useRouter as useNextRouter } from 'next/router';
import { pick, isEqual } from 'lodash-es';

import NProgress from 'nprogress';
import { usePrevious } from './hooks';
import { usePageOptions } from './page';

export { Router, NProgress };

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
  router.page = page;
  return router;
}

export function usePreviousRoute() {
  const router = useRouter();
  const previous = usePrevious(pick(router, ROUTER_KEYS), {
    shouldChange: (prev, next) => {
      return !isEqual(pick(prev, ROUTER_KEYS), pick(next, ROUTER_KEYS));
    },
    fallback: router,
  });
  return previous;
}

export function useRouterProgress(handler = NProgress) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      if (typeof handler.start === 'function') handler.start();
    };

    const handleStop = () => {
      if (typeof handler.done === 'function') handler.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, handler]);
}
