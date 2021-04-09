import { NextDataHooksProvider } from 'next-data-hooks';

import Head from '@mono/components/Head';
import CookieConsent from '@mono/components/CookieConsent';
import { LayoutTree, Link, UIkit } from '@mono/next';

import { settingsContext } from '@mono/next';

import Nav from '@app/components/Nav';
import OffCanvas from '@app/components/Nav/Offcanvas';

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
    <UIkit>
      <Settings cookie={cookie}>
        <Nav />
        <NextDataHooksProvider {...props}>
        <LayoutTree Component={Component} pageProps={pageProps} />
        </NextDataHooksProvider>
      </Settings>
    </UIkit>
    <OffCanvas />
    <CookieConsent />
  </>);
}
