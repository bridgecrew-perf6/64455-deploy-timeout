/* eslint-disable array-callback-return */
/* eslint-disable func-names */

import { useState, useMemo, useCallback, useEffect } from 'react';

import {
  InstantSearch,
  Configure,
  connectRefinementList,
} from 'react-instantsearch-dom';

import { useDebounce } from 'react-use';

import {
  useConfig,
  useRouter,
  useTranslation,
  useCurrency,
  useGlobalContext,
} from '@foundation/next';

import {
  set,
  omit,
  trim,
  isEqual,
  isBlank,
  isEmpty,
  orderBy,
  cloneDeep,
  joinUrl,
  traverse,
  isPlainObject,
} from '@foundation/lib/util';

import { searchClient } from '@app/lib/algolia';

import { useCategoryPaths } from '@app/hooks/shop';

const RefinementWrapper = ({ children }) => <>{children}</>;

const prepareFn = refinement => refinement;

const META_PROPS = ['i18n', 'options'];

const URL_PARAMS = ['page', 'query'];

const INTERNAL_PARAMS = URL_PARAMS.concat('paths');

const DEFAULTS = {};

const isSSR = typeof window === 'undefined';

export const VirtualRefinementList = connectRefinementList(() => null);

export const searchStateToURL = (searchState, pathname) => {
  pathname =
    pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  const params = {};
  if (searchState.page > 1) {
    params.page = searchState.page;
  }
  if (searchState.query?.match(/\S+/)) {
    params.query = searchState.query;
  }
  return searchState && !isEmpty(params)
    ? `${pathname}?${toQueryString(params)}`
    : pathname;
};

export const paramsToSearchState = (params = {}) => {
  const searchState = {};
  if (params.page?.match(/^\d+$/)) {
    searchState.page = parseInt(params.page, 10);
  }
  if (params.query?.match(/\S+/)) {
    searchState.query = params.query;
  }
  return { page: 1, ...searchState };
};

export const useAlgolia = () => {
  const { locale } = useRouter();
  const config = useConfig('search');
  return useMemo(() => {
    const entries = config('refinements') ?? [];
    const refinements = entries.map((entry, index) => {
      return {
        ...entry,
        ...entry.options,
        label: config(['refinements', index, 'label']),
      };
    });
    const indexName = `${config(['algolia', 'indexBasename'])}_${locale}`;
    return { client: searchClient, indexName, config, refinements };
  }, [config, locale]);
};

export const parseRange = (range, fn = v => v) => {
  return trim(range, ':')
    .split(':')
    .map(v => parseInt(v, 10))
    .filter(v => !Number.isNaN(v))
    .map(fn);
};

export const useNumericRanges = (items = [], options = {}) => {
  const { currency } = options;
  const { t } = useTranslation();
  const c = useCurrency();

  return useMemo(() => {
    const fn = currency ? v => c.format(v) : v => v;
    return items
      .filter(entry => !isBlank(entry.value))
      .map(entry => {
        const [start, end] = parseRange(entry.value, fn);
        const translated = entry.label.indexOf(':') > 0;
        let label;
        if (start && end) {
          label = translated ? t(entry.label, { start, end }) : entry.label;
        } else if (start) {
          label = translated ? t(entry.label, { value: start }) : entry.label;
        } else {
          label = t('common:ranges.all');
        }
        return { ...entry, label };
      });
  }, [c, currency, items, t]);
};

export const withAlgolia = (Component, options = {}) => {
  const {
    onSearchStateChange: onStateChange,
    persistenceKey = 'searchState',
    pathname,
    ...config
  } = options;

  const createURL = searchState => {
    return searchStateToURL(searchState, pathname);
  };

  return ({ initialSearchState, initialResultsState, ...props }) => {
    const global = useGlobalContext(true);
    const algolia = useAlgolia();
    const router = useRouter();

    const resultsState = isSSR ? initialResultsState : undefined;

    const persistedState = global.get(persistenceKey, {});

    const [searchState, setSearchState] = useState(
      persistedState ?? initialSearchState // order is important
    );

    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
      const state = paramsToSearchState(router.query);
      if (router.isReady) {
        setInitialized(true);
        setSearchState(current => {
          const updated = { ...current, ...state };
          return isEqual(current, updated) ? current : updated;
        });
      }
    }, [router]);

    useDebounce(
      () => {
        const href = searchStateToURL(searchState);
        if (isInitialized && router.asPath !== href) {
          const prefix = router.route === '/shop' ? router.route : '/';
          const localHref = searchStateToURL(
            searchState,
            joinUrl(prefix, ...(router.query.path ?? []))
          );
          global.set('productCategoryUrl', localHref);
          router.push(href, href, { shallow: true });
        }
      },
      300,
      [searchState, isInitialized, router.asPath]
    );

    const categoryPaths = useCategoryPaths(paths => {
      setSearchState(state => {
        let updated;
        if (isInitialized) {
          // NOTE this will reset the page and all other refinementList entries
          updated = set({ page: 1 }, ['refinementList', 'paths'], paths);
        } else {
          updated = set(cloneDeep(state), ['refinementList', 'paths'], paths);
        }
        return { ...state, ...updated };
      });
    });

    const onSearchStateChange = useCallback(
      state => {
        if (isInitialized && typeof onStateChange === 'function') {
          onStateChange(state, global);
        }
        global.set(persistenceKey, omit(state, INTERNAL_PARAMS));
        setSearchState(state);
      },
      [global, isInitialized]
    );

    return (
      <InstantSearch
        searchClient={algolia.client}
        indexName={algolia.indexName}
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
        resultsState={resultsState}
        createURL={createURL}
      >
        <Configure {...DEFAULTS} {...config} />
        <VirtualRefinementList
          attribute="paths"
          defaultRefinement={categoryPaths}
        />
        <Component {...props} algolia={algolia} />
      </InstantSearch>
    );
  };
};

export const createContainer = (config = {}) => {
  // eslint-disable-next-line react/display-name
  return props => (
    <InstantSearch {...props}>
      <Configure {...DEFAULTS} {...config} />
      <VirtualRefinementList attribute="paths" />
    </InstantSearch>
  );
};

export const withRefinement = (Component, prepare = prepareFn) => {
  return ({ wrapperComponent, ...refinement }) => {
    const prepared = prepare(refinement);
    if (prepared) {
      const refinementProps = omit(
        typeof prepared === 'object' ? prepared : refinement,
        META_PROPS
      );
      const WrapperComponent = wrapperComponent ?? RefinementWrapper;
      return (
        <Component {...refinementProps} WrapperComponent={WrapperComponent} />
      );
    } else {
      return null;
    }
  };
};

export const withRefinementList = (Component, options = {}) => {
  const { autoHide, alphabetical } = options;
  return withRefinement(Component, props => {
    const openRefinements = Array.isArray(props.openRefinements)
      ? props.openRefinements
      : [];
    const _autoHide = autoHide || props.autoHide;
    const _alphabetical = alphabetical || props.alphabetical;
    if (_autoHide && isEmpty(props.items) && !props.searchable) {
      return false;
    } else {
      const refinementId = props.attribute.replace(/\./g, '-');
      const initialOpen =
        props.initialOpen || openRefinements.includes(refinementId);
      const items = _alphabetical ? orderBy(props.items, 'label') : props.items;
      return {
        ...props,
        items,
        refinementId,
        initialOpen,
        ...options,
      };
    }
  });
};

export const serializeResultsState = resultsState => {
  return traverse(resultsState).map(function (v) {
    if (typeof v === 'object' && !isPlainObject(v) && !Array.isArray(v)) {
      this.update(JSON.parse(JSON.stringify(v)));
    } else if (typeof v === 'function') {
      this.remove();
    }
  });
};

// Helpers

function toQueryString(params = {}) {
  return Object.keys(params)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
}
