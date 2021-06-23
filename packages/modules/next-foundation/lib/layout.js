/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { withLayout, LayoutTree } from '@moxy/next-layout';
import { useDeepCompareMemo } from './util';

import { useSettings } from './settings';

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
// Configuration:
//
// const config = {
//   appLayout: 'main',
//   pageLayouts: {
//     main: MainLayout,
//     blog: BlogLayout,
//     special: [OtherLayout, SpecialLayout] // explicit, mixed types
//   },
// };
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
// Dynamic - getPageProps:
//
// return getPageProps(context, {
//   page: {
//     title: item.content?.title,
//     subtitle: item.content?.subtitle,
//     content: item.content,
//   },
//   pageLayout: item.layout ?? 'pages',
// });
//
//
// Note: you can redefine appLayout and pageLayouts dynamically, too.

export function withAppLayout(config = {}) {
  return (Component, props = {}, options = {}) => {
    const pageLayout = props.pageLayout ?? options.pageLayout;
    return lookupLayout(Component, {
      ...config,
      ...props,
      pageLayout,
      pageLayouts: {
        ...config.pageLayouts,
        ...props.pageLayouts,
      },
    })(Component);
  };
}

export function buildLayout(config = {}) {
  const withLayout = withAppLayout(config);
  return function useAppLayout(Component, pageProps) {
    const { currentPageOptions, ...props } = pageProps;
    const { locale, currency, settings } = useSettings();
    const currentSettings = settings.get();
    return useDeepCompareMemo(
      () => withLayout(Component, props, currentPageOptions),
      [Component, currentPageOptions, props, locale, currency, currentSettings]
    );
  };
}

export function lookupLayout(Component, props = {}) {
  const wrap = withLayout(options => wrapInLayout(Component, options), props);
  return typeof wrap === 'function' ? wrap : Component => Component;
}

export const LayoutProvider = props => <LayoutTree {...props} />;

function wrapInLayout(
  Component,
  { appLayout, pageLayout, pageLayouts, ...props }
) {
  pageLayouts = pageLayouts || {};
  const _normalize = normalize.bind(null, pageLayouts);

  let layout = isLayout(pageLayout) ? pageLayout : Component.pageLayout;

  if (typeof layout === 'string' && Array.isArray(pageLayouts[layout])) {
    layout = pageLayouts[layout];
  } else if (typeof layout === 'object') {
    const { layout: layoutName, ...layoutProps } = layout;
    if (Array.isArray(pageLayouts[layoutName])) {
      layout = pageLayouts[layoutName];
      Object.assign(props, layoutProps);
    }
  }

  if (Array.isArray(layout)) {
    // explicit hierarchy
    return wrapComponents(layout.map(_normalize), props);
  }

  const nesting = []
    .concat(appLayout ?? [])
    .concat(isLayout(layout) ? layout : []);
  return wrapComponents(nesting.map(_normalize), props);
}

function isLayout(layout, objType = false) {
  return (
    typeof layout === 'string' ||
    typeof layout === 'function' ||
    (!objType && typeof layout === 'object' && isLayout(layout.layout, true))
  );
}

function normalize(layouts, layout, _recursion = 0) {
  if (typeof layout === 'string') {
    const preset = layouts?.[layout];
    if (Array.isArray(preset) && _recursion <= 5) {
      return preset.map(l => normalize(layouts, l, _recursion + 1));
    } else if (preset) {
      return { Layout: preset };
    } else {
      return {};
    }
  } else if (typeof layout === 'function') {
    return { Layout: layout };
  } else if (typeof layout === 'object' && isLayout(layout.layout, true)) {
    const { layout: _, ...props } = layout;
    const normalized = normalize(layouts, layout.layout);
    if (Array.isArray(normalized)) {
      return normalized
        .flat(10)
        .map(n => ({ ...n, props: { ...n.props, ...props } }));
    } else {
      return { ...normalized, props };
    }
  } else {
    return {};
  }
}

function wrapComponents(components, pageProps = {}) {
  return components
    .flat(10)
    .reverse()
    .reduce((component, { Layout, props = {} }) => {
      if (typeof Layout !== 'function') return null;
      props = { ...pageProps, ...props };
      return <Layout {...props}>{component}</Layout>;
    }, null);
}
