import React, { useMemo, useContext, useRef } from 'react';
import { useRouter } from 'next/router'; // use standard

import { useObject } from './hooks';
import { useConfig } from './site';
import { useGlobalContext } from './context';
import { omit, mergeObjects, isEqual, isBlank, wrapStateObject } from './util';

export const PageContext = React.createContext();

const handlers = [];

export function beforeRender(handler) {
  if (typeof handler === 'function') handlers.push(handler);
}

export const PageContextProvider = ({
  children,
  Component,
  props,
  data: defaults = {},
  shared: initial = {},
  options = {},
}) => {
  const globalData = useGlobalContext();
  const shared = useRef(initial);
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

    const wrapped = wrapStateObject(pageProps, setPageProps, defaults);

    const global = wrapStateObject(globalData, data => {
      if (typeof data === 'function') {
        Object.assign(globalData, data(globalData));
      } else if (typeof data === 'object') {
        Object.assign(globalData, data); // merge instead of overwrite
      }
    });

    Object.assign(wrapped, {
      shared: shared.current,
      global,
      options,
    });

    pageProps = handlers.reduce((memo, handler) => {
      return {
        ...memo,
        ...handler(memo, {
          page: wrapped,
          Component,
          props,
          router,
          shared: shared.current,
          global,
          options,
        }),
      };
    }, pageProps);

    return wrapped;
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

export function useSharedState() {
  const context = useContext(PageContext);
  if (typeof context?.shared !== 'object') return {};
  return context.shared;
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
