import { Router, useRouter as useNextRouter } from 'next/router';
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
import { usePage } from './page';

export { Router };

export function useRouter() {
  const { router: page = {} } = usePage();
  const router = useNextRouter();
  router.page = page;
  return router;
}

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
  const { route, asPath } = useRouter();
  if (typeof options !== 'object') return [false, false];
  const active =
    asPath === options.href || asPath === options.as || route === options.route;
  const match =
    startsWith(asPath, options.href) || startsWith(asPath, options.as);
  return [active, match];
}

const NullRender = () => null;

export function Link({
  children,
  activeClassName,
  matchClassName,
  asPath, // Next Link 'as' property
  as, // Render as element/component
  partial,
  before,
  after,
  newWindow,
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
  } else if (typeof asPath === 'string') {
    props.as = asPath;
  }

  if (!props.href && typeof props.as !== 'string') props.href = '';

  if (newWindow) props.target = '_blank';

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
    const Before = typeof before === 'function' ? before : NullRender;
    const After = typeof after === 'function' ? after : NullRender;
    return (
      <Element className={className}>
        <Before active={active} match={match} link={props} />
        <Wrapper {...props} passHref>
          {child}
        </Wrapper>
        <After active={active} match={match} link={props} />
      </Element>
    );
  } else if (typeof as === 'function') {
    return as(
      className,
      <Wrapper {...props} passHref>
        {child}
      </Wrapper>
    );
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
