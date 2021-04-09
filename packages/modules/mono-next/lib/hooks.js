import { useState, useEffect, useRef, useMemo } from 'react';

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
  const memo = useMemo(() => mapFns.map(mapFn => mapFn(state)), [state]);
  return [state, setState, memo];
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // browser only
  return mounted;
}