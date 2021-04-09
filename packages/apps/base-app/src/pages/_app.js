import { NextDataHooksProvider } from 'next-data-hooks';

import Head from '@mono/components/Head';
import { LayoutTree, Link } from '@mono/next';

import { settingsContext, withAppLayout } from '@mono/next';

// Layouts
import MainLayout from '@app/layouts/main';
import BlogLayout from '@slices/blog/layouts/main';

const withLayout = withAppLayout({
  appLayout: 'main',
  pageLayouts: {
    main: MainLayout,
    blog: BlogLayout
  }
});

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
          Component={withLayout(Component, props)} 
          pageProps={pageProps}
        />
        </NextDataHooksProvider>
      </Settings>
  </>);
}
