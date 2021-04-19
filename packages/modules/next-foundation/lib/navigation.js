import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, {
  Children,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { isExternalUrl } from './util';

export { useRouter };

export function useLocationHash(fn) {
  const isBrowser = typeof window !== 'undefined';
  const [hash, setHash] = useState(() => {
    return isBrowser ? window.location.hash : '';
  });

  const ref = useRef();
  ref.current = fn;

  const onHashChange = useCallback(() => {
    if (typeof ref.current === 'function') {
      if (ref.current(window.location.hash) !== false) {
        setHash(window.location.hash);
      }
    } else {
      setHash(window.location.hash);
    }
  }, [ref]);

  useEffect(() => {
    onHashChange(); // initial
    window.addEventListener('hashchange', onHashChange, false);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [onHashChange]);

  const _setHash = useCallback(
    newHash => {
      if (isBrowser && newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash, isBrowser]
  );

  return [hash, _setHash];
}

export function useCurrentRoute(options = {}) {
  const { route, pathname } = useRouter();
  if (typeof options !== 'object') return [false, false];
  const active =
    pathname === options.href ||
    pathname === options.as ||
    route === options.route;
  const match =
    startsWith(pathname, options.href) || startsWith(pathname, options.as);
  return [active, match];
}

export function Link({
  children,
  activeClassName,
  matchClassName,
  as,
  partial,
  ...props
}) {
  let child = React.isValidElement(children) ? Children.only(children) : null;
  if (!(React.isValidElement(child) && child.type === 'a')) {
    child = <a {...props}>{children}</a>;
  }

  let Wrapper = NextLink;
  if (
    typeof props.href === 'string' &&
    (props.href.startsWith('#') || isExternalUrl(props.href))
  ) {
    Wrapper = ({ children }) => <>{children}</>;
  }

  const isElement = React.isValidElement(as);

  const childClassName =
    (isElement ? as.props.className : child ? child.props.className : '') ?? '';

  const [active, match] = useCurrentRoute(props);

  const className = useMemo(() => {
    const activeClass =
      activeClassName ?? Link.defaults.activeClassName ?? 'active';
    const matchClass =
      matchClassName ?? Link.defaults.matchClassName ?? 'match';
    let classNames = [].concat(childClassName || []);
    classNames = classNames.concat(
      (active || (match && partial) ? activeClass : []) || []
    );
    classNames = classNames.concat((match ? matchClass : []) || []);
    return classNames.length > 0 ? classNames.join(' ') : null;
  }, [activeClassName, matchClassName, childClassName, active, match, partial]);

  if (isElement || typeof as === 'string') {
    const Element = as;
    return (
      <Element className={className}>
        <Wrapper {...props}>{child}</Wrapper>
      </Element>
    );
  } else if (typeof as === 'function') {
    return as(className, <Wrapper {...props}>{child}</Wrapper>);
  } else {
    return (
      <Wrapper {...props}>{React.cloneElement(child, { className })}</Wrapper>
    );
  }
}

Link.defaults = {
  // activeClassName: 'active', // not set here
  // matchClassName: 'match',
};

function startsWith(a, b) {
  return typeof a === 'string' && typeof b === 'string' && a.startsWith(b);
}
