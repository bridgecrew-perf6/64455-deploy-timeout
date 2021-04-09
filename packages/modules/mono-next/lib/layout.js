import React from 'react';
import { withLayout } from '@moxy/next-layout';

export * from '@moxy/next-layout';

export function lookupLayout(Component, layout) {
  let wrap;
  if (React.isValidElement(layout) || typeof layout === 'function') {
    wrap = withLayout(layout);
  } else if (typeof layout === 'string') {
    wrap = withLayout((options) => wrapLayout(Component, options), { layout });
  } else if (typeof layout === 'object') {
    wrap = withLayout((options) => wrapLayout(Component, options), layout);
  }
  return typeof wrap === 'function' ? wrap : (Component) => Component;
}

export function withAppLayout(layout) {
  return (Component) => {
    return lookupLayout(Component, layout ?? {})(Component);
  };
}

function wrapLayout(Component, { layout, layouts, ...props }) {
  const _normalize = normalize.bind(null, layouts || {});
  layout = _normalize(layout);
  if (Array.isArray(Component.layout)) {
    return wrapComponents(Component.layout.map(_normalize), props);
  } else if (typeof Component.layout === 'string' || typeof Component.layout === 'function') {
    const nesting = [].concat(layout ?? []).concat(Component.layout);
    return wrapComponents(nesting.map(_normalize), props);
  } else if (typeof layout === 'function' && Component.layout !== false) { // within main
    const Layout = layout;
    return (<Layout {...props}><Component /></Layout>);
  } else if (React.isValidElement(layout) && Component.layout !== false) { // within main
    return React.cloneElement(layout, props, Component.layout);
  }
};

function normalize(layouts, layout) {
  return typeof layout === 'string' ? layouts?.[layout] : layout;
}

function wrapComponents(components, props = {}) {
  return components.concat([]).reverse().reduce((component, Layout) => {
    return (<Layout {...props}>{component}</Layout>);
  }, null);
}
