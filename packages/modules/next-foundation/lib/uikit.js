/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Link } from './navigation';

// Setup Link classes to use UIkit
Link.defaults.activeClassName = Link.defaults.activeClassName ?? 'uk-active';
Link.defaults.matchClassName =
  Link.defaults.matchClassName ?? 'uk-active-match';

export function useUIkit(fn) {
  const [ready, setReady] = useState(false);

  const ref = useRef();
  ref.current = fn;

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser && !window.UIkit) {
      async function load() {
        const UIkit = await import('@atelierfabien/uikit');
        const icons = await import(
          '@atelierfabien/uikit/dist/js/uikit-icons.min'
        ).then((m) => m.default);
        window.UIkit = UIkit;
        UIkit.use(icons);
        setReady(true);
        if (typeof ref.current === 'function') ref.current(window.UIkit);
      }

      load();
    } else if (isBrowser && window.UIkit) {
      setReady(true);
      if (typeof ref.current === 'function') ref.current(window.UIkit);
    }
  }, [ref]);

  return ready;
}

export function UIkit({ fadeIn, children, ...props }) {
  const ready = useUIkit();
  const className = ready ? (fadeIn ? 'uk-animation-fade' : null) : 'uk-hidden';
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
