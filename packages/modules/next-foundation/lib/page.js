import React, { useMemo, useContext } from 'react';
import { useRouter } from 'next/router'; // use standard

import { useObject } from './hooks';
import { useConfig } from './site';
import { useGlobalContext } from './context';
import { omit, mergeObjects, isEqual, isBlank, wrapStateObject } from './util';

export const PageContext = React.createContext();

// Example:
//
// beforeRender((page, { global, router, options }) => {
//   global.merge(state => ({ ...state, count: (state.count ?? 0) + 1 }));
//   console.log('PATH', router.asPath);
//   console.log('COUNT', global.get('count'));
//   console.log('OPTIONS', options);
//   return { somePageOverride: true };
// });

let handlers = [];

export const initializeApp = () => {
  handlers = []; // reset handlers
};

export function beforeRender(handler) {
  if (typeof handler === 'function') handlers.push(handler);
}

export const PageContextProvider = ({
  children,
  Component,
  props,
  data: defaults = {},
  options = {},
}) => {
  const global = useGlobalContext();
  const router = useRouter();

  const data = useMemo(() => {
    // reset on router change (per-page)

    const callbacks = [].concat(handlers);

    let pageProps = { ...defaults };

    function setPageProps(data) {
      if (typeof data === 'function') {
        pageProps = { ...data(pageProps) };
      } else if (typeof data === 'object') {
        pageProps = { ...data };
      }
    }

    if (typeof Component.pageProps === 'function') {
      callbacks.push(Component.pageProps);
    } else if (typeof Component.pageProps === 'object') {
      setPageProps(Component.pageProps);
    }

    const pageWrapper = wrapStateObject(pageProps, setPageProps, defaults);

    const globalWrapper = wrapStateObject(global, (data) => {
      if (typeof data === 'function') {
        Object.assign(global, data(global));
      } else if (typeof data === 'object') {
        Object.assign(global, data); // merge instead of overwrite
      }
    });

    const optionsWrapper = wrapStateObject(options, (data) => {
      if (typeof data === 'function') {
        Object.assign(options, data(options));
      } else if (typeof data === 'object') {
        Object.assign(options, data); // merge instead of overwrite
      }
    });

    Object.assign(pageWrapper, {
      global,
      options,
    });

    const opts = {
      page: pageWrapper,
      global: globalWrapper,
      options: optionsWrapper,
      Component,
      props,
      router,
    };

    pageProps = handlers.reduce((memo, handler) => {
      return { ...memo, ...handler(memo, opts) };
    }, pageProps);

    return pageWrapper;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
};

// Examples:
//
// Product.memoizeComponent = true;
//
// Product.memoizeComponent = (previous, next) => false;

export const PageProvider = React.memo(
  PageContextProvider,
  (previous, next) => {
    if (previous?.Component?.memoizeComponent === true) {
      return isEqual(previous, next);
    } else if (typeof previous?.Component?.memoizeComponent === 'function') {
      return previous?.Component?.memoizeComponent(previous, next);
    } else {
      return false;
    }
  }
);

export function usePage(data) {
  const context = useContext(PageContext);

  if (data !== true && typeof context !== 'object') return {};

  if (data === true) {
    return context;
  } else if (typeof data === 'function') {
    data(context);
  } else if (typeof data === 'object') {
    context.merge(data);
  }

  return context.get();
}

export function usePropsOrPage(props) {
  const context = useContext(PageContext);
  if (typeof props === 'object' && props) {
    return props;
  } else if (typeof context === 'object') {
    return context.get();
  } else {
    return {};
  }
}

export function usePageData(data) {
  const page = usePage(data);
  return useObject(page);
}

export function usePageOptions(passThrough) {
  const context = useContext(PageContext);
  if (typeof passThrough === 'object' && !isBlank(passThrough)) {
    return passThrough;
  } else if (typeof context?.options !== 'object') {
    return {};
  }
  return context.options;
}

export function usePageFragments(page, inherit = 'all') {
  const { layout = {}, fragments = {} } = page ?? usePage();
  const layoutFragments = layout?.fragments;
  const baseFragments = useConfig('fragments')();
  return useMemo(() => {
    if (inherit === 'all') {
      return mergeObjects(baseFragments, layoutFragments, fragments);
    } else if (inherit === 'layout') {
      return mergeObjects(layoutFragments, fragments);
    } else {
      return mergeObjects({}, fragments);
    }
  }, [baseFragments, fragments, inherit, layoutFragments]);
}

export function usePagePart(partName, props) {
  const options = usePageOptions(props);
  return useMemo(() => {
    const part = mergeObjects({}, options[partName]);
    const hasHeading = !isBlank(omit(part, 'breadcrumbs'));
    const hasBreadcrumbs =
      Array.isArray(part.breadcrumbs) && part.breadcrumbs.length > 0;
    return hasHeading || hasBreadcrumbs ? part : null;
  }, [options, partName]);
}
