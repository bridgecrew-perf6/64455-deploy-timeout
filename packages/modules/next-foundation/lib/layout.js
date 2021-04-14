import React from 'react';
import { withLayout } from '@moxy/next-layout';

export * from '@moxy/next-layout';

// Layout specs - will be wrapped in app layout by default:
//
// - pageLayout: 'string'
// - pageLayout: { layout: 'string', someProp: true }
// - pageLayout: ({ children, ...props }) => <MyLayout {...props}>{children}</MyLayout>
//
// Use an array of specs to define an explicit hierarchy (without app layout):
//
// - pageLayout: ['foo', 'bar'] (can be any of the above, even mixed types)
//
// Static - set as page component property:
//
// MyPage.pageLayout = <spec>
//
// Dynamic - return as part of getStaticProps or getServerSideProps:
//
// return {
//   props: {
//     content,
//     pageLayout: { layout: content.layout }
//   },
// };
//
// Note: you can redefine appLayout and pageLayouts dynamically, too.

export function withAppLayout(config = {}) {
  return (Component, props = {}) => {
    return lookupLayout(Component, {
      ...config,
      ...props,
      pageLayouts: {
        ...config.pageLayouts,
        ...props.pageLayouts,
      },
    })(Component);
  };
}

export function lookupLayout(Component, props = {}) {
  const wrap = withLayout(options => wrapInLayout(Component, options), props);
  return typeof wrap === 'function' ? wrap : Component => Component;
}

function wrapInLayout(Component, { appLayout, pageLayout, pageLayouts }) {
  const _normalize = normalize.bind(null, pageLayouts || {});
  const layout = isLayout(pageLayout) ? pageLayout : Component.pageLayout;
  if (Array.isArray(layout)) {
    // explicit hierarchy
    return wrapComponents(layout.map(_normalize));
  }
  const nesting = []
    .concat(appLayout ?? [])
    .concat(isLayout(layout) ? layout : []);
  return wrapComponents(nesting.map(_normalize));
}

function isLayout(layout, objType = false) {
  return (
    typeof layout === 'string' ||
    typeof layout === 'function' ||
    (!objType && typeof layout === 'object' && isLayout(layout.layout, true))
  );
}

function normalize(layouts, layout) {
  if (typeof layout === 'string') {
    return { Layout: layouts?.[layout] };
  }
  if (typeof layout === 'function') {
    return { Layout: layout };
  }
  if (typeof layout === 'object' && isLayout(layout.layout, true)) {
    const { layout: _, ...props } = layout;
    const normalized = normalize(layouts, layout.layout);
    return { ...normalized, props };
  }
  return {};
}

function wrapComponents(components) {
  return components
    .concat([])
    .reverse()
    .reduce((component, { Layout, props = {} }) => {
      if (typeof Layout !== 'function') return null;
      return <Layout {...props}>{component}</Layout>;
    }, null);
}
