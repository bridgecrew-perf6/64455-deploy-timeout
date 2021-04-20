import React, { useMemo, useContext } from 'react';
import { useRouter } from 'next/router';

export { default as Page } from '../components/Page';

let pageData = {}; // singleton

export const PageContext = React.createContext();

function setPageData(data) {
  if (typeof data === 'function') {
    pageData = { ...data(pageData) };
  } else if (typeof data === 'object') {
    pageData = { ...data };
  }
}

export const PageProvider = ({ children, defaults = {} }) => {
  const router = useRouter();

  const data = useMemo(() => {
    // reset on router change (per-page)
    setPageData({ ...defaults });

    return {
      get(key) {
        return arguments.length ? pageData[key] : pageData;
      },
      set(key, value) {
        setPageData(state => ({ ...state, [key]: value }));
      },
      unset(key) {
        delete pageData[key];
      },
      reset() {
        setPageData({ ...defaults });
      },
      merge(data) {
        if (typeof data === 'function') {
          setPageData(data);
        } else if (typeof data === 'object') {
          setPageData(state => ({ ...state, ...data }));
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
};

export function usePage(data) {
  const context = useContext(PageContext);

  if (typeof context !== 'object') return pageData;

  if (typeof data === 'function') {
    data(context);
  } else if (typeof data === 'object') {
    context.merge(data);
  }

  return context.get();
}
