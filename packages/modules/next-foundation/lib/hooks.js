import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from 'react';

import { get } from 'lodash-es';

import { NextDataHooksContext } from 'next-data-hooks';

export * from 'next-data-hooks';

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

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
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
  const memo = useMemo(() => mapFns.map(mapFn => mapFn(state)), [
    mapFns,
    state,
  ]);
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
  const fn = useCallback(
    e => {
      const delegateTarget = closest(e.target, selector);
      if (delegateTarget) handler(e, delegateTarget);
    },
    [selector, handler]
  );

  useEffect(() => {
    window.addEventListener(eventName, fn, options);
    return () => window.removeEventListener(eventName, fn, options);
  }, [eventName, selector, fn, options]);
}

export function useObject(data = {}) {
  return useCallback(
    (...path) => {
      if (path.length === 0) return data;
      const key = path
        .map(p => (Array.isArray(p) ? p : String(p).split('.')))
        .flat();
      return get(data, key);
    },
    [data]
  );
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
