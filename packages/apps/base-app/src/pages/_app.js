import { NextDataHooksProvider } from 'next-data-hooks';

import Head from '@mono/components/Head';
import { LayoutTree, Link } from '@mono/next';

import { settingsContext, withAppLayout } from '@mono/next';

import MainLayout from '@app/layouts/main';
import BlogLayout from '@slices/blog/layouts/main';

const layoutConfig = {
  layout: 'main',
  layouts: {
    main: MainLayout,
    blog: BlogLayout
  }
};

// Global scss
import '@app/styles/uikit.scss';
import '@app/styles/global.scss';

Link.defaults.activeClassName = 'uk-active';
Link.defaults.matchClassName = 'uk-active-match';

export default function App({ Component, pageProps }) {
  const { children, cookie, ...props } = pageProps;
  const Settings = settingsContext();

  return (<>
    <Head />
      <Settings cookie={cookie}>
        <NextDataHooksProvider {...props}>
        <LayoutTree 
          Component={withAppLayout(layoutConfig)(Component)} 
          pageProps={pageProps}
        />
        </NextDataHooksProvider>
      </Settings>
  </>);
}
