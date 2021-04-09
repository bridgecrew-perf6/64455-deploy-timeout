import React from 'react';
import { withLayout } from '@moxy/next-layout';

export * from '@moxy/next-layout';

function lookupLayout(Component, options = {}) {
  console.log('LOOKUP', options)
}

export function withAppLayout(layout) {
  return (Component) => {
    let wrapLayout;
    if (React.isValidElement(layout) || typeof layout === 'function') {
      wrapLayout = withLayout(layout);
    } else if (typeof layout === 'string') {
      wrapLayout = withLayout((options) => lookupLayout(Component, options), { layout });
    } else if (typeof layout === 'object') {
      wrapLayout = withLayout((options) => lookupLayout(Component, options), layout);
    }
    return (typeof wrapLayout === 'function' ? wrapLayout(Component) : Component) ?? Component;
  };
}
