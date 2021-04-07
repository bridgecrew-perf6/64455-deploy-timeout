import { Link } from 'lib/navigation';
import useTranslation from 'next-translate/useTranslation';

import Logo from 'components/Logo';
import LocaleListItems from '../LocaleList/Items';
import CurrencyListItems from '../CurrencyList/Items';

import Links from './Links';

export default function Nav() {
  const { t } = useTranslation('common');

  return (
    <nav className="transition uk-navbar-container uk-navbar-container-centered uk-navbar-transparent" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky" uk-navbar="">
      <div className="uk-flex uk-container">
        <div className="uk-navbar-left">
          <Link href="/"><a className="uk-navbar-item uk-logo"><Logo /></a></Link>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav uk-visible@m">
            <Links />
            <li>
              <a href="#"><span uk-icon="cog"></span></a>
              <div className="uk-navbar-dropdown" uk-dropdown="offset: 0">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <LocaleListItems />
                  <li className="uk-nav-divider"></li>
                  <CurrencyListItems />
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <a className="uk-navbar-toggle uk-hidden@m" href="#offcanvas" uk-toggle="" uk-navbar-toggle-icon=""></a>
      </div>
    </nav>
  );
}