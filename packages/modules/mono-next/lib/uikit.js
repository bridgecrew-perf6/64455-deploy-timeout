import { useState, useEffect, useRef } from 'react';

export function useUIkit(fn) {
  const [ready, setReady] = useState(false);

  const ref = useRef();
  ref.current = fn;

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser && !window.UIkit) {
      const UIkit = require('@atelierfabien/uikit');
      const icons = require('@atelierfabien/uikit/dist/js/uikit-icons.min');
      window.UIkit = UIkit;
      UIkit.use(icons);
      setReady(true);
      if (typeof ref.current === 'function') ref.current(window.UIkit);
    } else if (isBrowser && window.UIkit) {
      setReady(true);
      if (typeof ref.current === 'function') ref.current(window.UIkit);
    }
  }, [ref]);

  return ready;
}

export function UIkit({ children }) {
  const ready = useUIkit();
  return (ready ? (<>{children}</>) : null);
}