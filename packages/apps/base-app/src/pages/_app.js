import Head from '@mono/components/Head';
import CookieConsent from '@mono/components/CookieConsent';
import { Link } from '@mono/lib/navigation';
import { UIkit } from '@mono/lib/uikit';

import { settingsContext } from '@app/state';

import Nav from '@app/components/Nav';
import OffCanvas from '@app/components/Nav/Offcanvas';

// Global scss
import '@app/styles/uikit.scss';
import '@app/styles/global.scss';

Link.defaults.activeClassName = 'uk-active';
Link.defaults.matchClassName = 'uk-active-match';

export default function App({ Component, pageProps }) {
  const Settings = settingsContext();

  return (<>
    <Head />
    <UIkit>
      <Settings cookie={pageProps.cookie}>
        <Nav />
        <Component {...pageProps} />
      </Settings>
    </UIkit>
    <OffCanvas />
    <CookieConsent />
  </>);
}
