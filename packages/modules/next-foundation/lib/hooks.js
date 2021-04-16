import { useState, useEffect, useRef, useMemo, useContext } from 'react';
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
