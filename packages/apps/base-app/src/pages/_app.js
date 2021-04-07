import Head from 'components/Head';
import CookieConsent from 'components/CookieConsent';
import { Link } from 'lib/navigation';
import { UIkit } from 'lib/uikit';

import { settingsContext } from 'state';

import Nav from 'components/Nav';
import OffCanvas from 'components/Nav/Offcanvas';

// Global scss
import 'styles/uikit.scss';
import 'styles/global.scss';

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
