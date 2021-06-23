import React, { useMemo, useContext } from 'react';
import { useRouter } from 'next/router'; // use standard

import { useObject } from './hooks';
import { useConfig } from './site';
import { mergeObjects, isEqual } from './util';

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
  options = {},
}) => {
  const router = useRouter();

  const data = useMemo(() => {
    // reset on router change (per-page)

    let pageProps = { ...defaults };

    const pageOptions = { ...options };

    function setPageProps(data) {
      if (typeof data === 'function') {
        pageProps = { ...data(pageProps) };
      } else if (typeof data === 'object') {
        pageProps = { ...data };
      }
    }

    setPageProps(Component.pageProps);

    pageProps = handlers.reduce((memo, handler) => {
      return {
        ...memo,
        ...handler(memo, { Component, props, router, options: pageOptions }),
      };
    }, pageProps);

    return {
      get(key) {
        return arguments.length ? pageProps[key] : pageProps;
      },
      set(key, value) {
        setPageProps(state => ({ ...state, [key]: value }));
      },
      unset(key) {
        delete pageProps[key];
      },
      reset() {
        setPageProps({ ...defaults });
      },
      merge(data) {
        if (typeof data === 'function') {
          setPageProps(data);
        } else if (typeof data === 'object') {
          setPageProps(state => ({ ...state, ...data }));
        }
      },
      options: pageOptions,
    };
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

  if (typeof context !== 'object') return {};

  if (typeof data === 'function') {
    data(context);
  } else if (typeof data === 'object') {
    context.merge(data);
  }

  return context.get();
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

export function usePageOptions() {
  const context = useContext(PageContext);
  if (typeof context?.options !== 'object') return {};
  return context.options;
}

export function usePageData(data) {
  const page = usePage(data);
  return useObject(page);
}
