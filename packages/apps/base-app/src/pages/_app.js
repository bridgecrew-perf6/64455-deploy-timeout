import { NextDataHooksProvider } from 'next-data-hooks';

import Head from '@mono/components/Head';
import { LayoutTree, Link } from '@mono/next';

import { settingsContext } from '@mono/next';

import MainLayout from '@app/layouts/main';

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
          Component={Component} 
          pageProps={pageProps} 
          defaultLayout={<MainLayout />}
        />
        </NextDataHooksProvider>
      </Settings>
  </>);
}
