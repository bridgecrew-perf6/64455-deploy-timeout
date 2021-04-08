import { NextDataHooksProvider } from 'next-data-hooks';

import Head from '@mono/components/Head';
import CookieConsent from '@mono/components/CookieConsent';
import { Link } from '@mono/next';
import { UIkit } from '@mono/next';

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
          <Component {...props}>{children}</Component>
        </NextDataHooksProvider>
      </Settings>
    </UIkit>
    <OffCanvas />
    <CookieConsent />
  </>);
}
