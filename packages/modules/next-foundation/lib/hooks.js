import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from 'react';

import { useRouter } from './router';

import { useGlobalContext } from './context';

import { get, detect, isBlank } from './util';

import { NextDataHooksContext } from 'next-data-hooks';

export * from 'next-data-hooks';

const isBrowser =
  typeof window !== 'undefined' && window.document?.createElement;

export function useDataHook(key, strict = true) {
  const dataHooksContext = useContext(NextDataHooksContext);
  if (strict && !dataHooksContext) {
    throw new Error(
      'Could not find `NextDataHooksContext`. Ensure `NextDataHooksProvider` is configured correctly.'
    );
  }
  const dataHooksValue = dataHooksContext[key];
  if (strict && !Object.keys(dataHooksContext).includes(key)) {
    throw new Error(
      `Did not find a data hook named "${key}". Ensure it was provided to getDataHooksProps.`
    );
  }
  return dataHooksValue;
}

export function usePrevious(value, options = {}) {
  const { fallback, shouldChange = () => true } = options;

  const ref = useRef();

  useEffect(() => {
    if (shouldChange(ref.current, value)) {
      ref.current = value;
    }
  }, [shouldChange, value]);

  if (typeof ref.current === 'undefined') {
    return fallback;
  } else {
    return ref.current;
  }
}

// Hook
export function useMemoCompare(next, compare) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}

// Example:
//
// const [state, setState, [value1, value2]] = useMappedState(
//   0,
//   value => value + 1,
//   value => value + 2
// );

export function useMappedState(initialState, ...mapFns) {
  const [state, setState] = useState(initialState || (() => {}));
  const memo = useMemo(
    () => mapFns.map((mapFn) => mapFn(state)),
    [mapFns, state]
  );
  return [state, setState, memo];
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []); // browser only
  return mounted;
}

export function useEventListener(eventName, selector, handler, options = {}) {
  const mounted = useMounted();

  const fn = useCallback(
    (e) => {
      const delegateTarget = closest(e.target, selector);
      if (delegateTarget && mounted) handler(e, delegateTarget);
    },
    [mounted, selector, handler]
  );

  useEffect(() => {
    window.addEventListener(eventName, fn, options);
    return () => window.removeEventListener(eventName, fn, options);
  }, [eventName, selector, fn, options]);
}

export function useDocumentEvent(eventName, handler, options = {}) {
  const fn = useCallback((e) => handler(e), [handler]);
  const once = useRef(false);
  const mounted = useMounted();

  useEffect(() => {
    const stopListening = () =>
      document.removeEventListener(eventName, fn, options);

    if (once.current) return;

    document.addEventListener(
      eventName,
      (...args) => {
        if (!mounted) return; // skip
        if (options.once) once.current = true;
        fn(...args);
      },
      options
    );

    return stopListening;
  }, [mounted, eventName, fn, options]);
}

export function useObject(data = {}) {
  return useCallback(
    (...path) => {
      if (path.length === 0) return data;
      const key = path
        .map((p) => (Array.isArray(p) ? p : String(p).split('.')))
        .flat();
      return get(data, key);
    },
    [data]
  );
}

export const useMutationObserver = (
  target,
  callback,
  options = { attributes: true, childList: true }
) => {
  const isDisconnected = useRef(false);

  const observer = useMemo(
    () =>
      isBrowser
        ? new MutationObserver((mutationRecord, mutationObserver) => {
            callback?.(mutationRecord, mutationObserver);
          })
        : null,
    [callback]
  );

  useEffect(() => {
    const element = getRefElement(target);
    if (observer && element) {
      observer.observe(element, options);
      return () => observer.disconnect();
    }
  }, [target, observer, options]);

  const disconnect = useCallback(() => {
    if (observer && !isDisconnected.current) {
      isDisconnected.current = true;
      observer.disconnect();
    }
  }, [observer]);

  return disconnect;
};

export function useDataTargetHref(eventName = 'click') {
  const router = useRouter();
  useEventListener(eventName, '[data-target-href]', (e, target) => {
    if (!isBlank(target.dataset.targetHref)) {
      e.preventDefault();
      router.push(target.dataset.targetHref);
    }
  });
}

export const useClickedItemTracking = (
  itemSelector,
  persistenceKey = 'clickedItem',
  eventName = 'click',
  resetOnUnmount = false
) => {
  const global = useGlobalContext(true);

  useEventListener(eventName, itemSelector, (e, target) => {
    if (!isBlank(target.dataset.id)) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      global.set(persistenceKey, { id: target.dataset.id, scrollTop });
    }
  });

  useUnmount(() => {
    if (resetOnUnmount) global.unset(persistenceKey);
  });

  return global.get(persistenceKey);
};

export const useClickedItem = (
  containerRef,
  persistenceKey = 'clickedItem',
  callback
) => {
  const global = useGlobalContext(true);
  const target = useRef(null);
  const fn = useRef(callback);

  const disconnect = useMutationObserver(
    containerRef,
    (mutations) => {
      const { id, scrollTop } = global.get(persistenceKey, {});
      if (isBlank(id)) {
        global.unset(persistenceKey);
        disconnect();
      } else {
        const element = detect(mutations, (mutation) => {
          if (mutation.type !== 'childList') return false;
          const addedNodes = Array.from(mutation?.addedNodes ?? []);
          return detect(addedNodes, (el) =>
            el.dataset.id === id ? el : false
          );
        });

        if (element && !target.current) {
          global.unset(persistenceKey);
          disconnect();
          if (typeof fn.current === 'function') fn.current(element, scrollTop);
          target.current = element;
        }
      }
    },
    { childList: true }
  );

  return [target.current, disconnect];
};

export function useCachedData(
  data,
  defaultData,
  cacheKey = 'cachedData',
  resetOnUnmount = false
) {
  const global = useGlobalContext(true);
  const [currentData, setCurrentData] = useState(data ?? defaultData);

  useEffect(() => {
    setCurrentData(data);
    global.set(cacheKey, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, data]);

  useUnmount(() => {
    if (resetOnUnmount) global.unset(cacheKey);
  });

  return currentData;
}

export const useHasLoaded = (data, check) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && check(data)) setLoaded(true);
  }, [check, data, loaded, setLoaded]);

  return loaded;
};

export function useUnmount(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => () => fnRef.current(), []);
}

// Utils

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype;

  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest(element, selector) {
  while (element && element.nodeType !== 9) {
    if (typeof element.matches === 'function' && element.matches(selector)) {
      return element;
    }
    element = element.parentNode;
  }
}

function getRefElement(element) {
  if (element && 'current' in element) {
    return element.current;
  }
  return element;
}
