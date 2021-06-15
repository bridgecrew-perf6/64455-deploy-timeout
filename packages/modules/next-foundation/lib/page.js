import React, { useMemo, useContext } from 'react';
import { useRouter } from './navigation';
import { useObject } from './hooks';
import { useConfig } from './site';
import { mergeObjects } from './util';

export { default as Page } from '../components/Page';

export const PageContext = React.createContext();

const handlers = [];

export function beforeRender(handler) {
  if (typeof handler === 'function') handlers.push(handler);
}

export const PageProvider = ({
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

    function setPageProps(data) {
      if (typeof data === 'function') {
        pageProps = { ...data(pageProps) };
      } else if (typeof data === 'object') {
        pageProps = { ...data };
      }
    }

    setPageProps(Component.pageProps);

    pageProps = handlers.reduce((memo, handler) => {
      return { ...memo, ...handler(memo, { Component, props, router }) };
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
      options,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
};

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
