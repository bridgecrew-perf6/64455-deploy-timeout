import { useLocale, useCurrency } from '@foundation/next';

import LocaleListItems from '@foundation/components/LocaleList/Items';
import CurrencyListItems from '@foundation/components/CurrencyList/Items';

import LocaleSelect from '@foundation/components/LocaleSelect';
import CurrencySelect from '@foundation/components/CurrencySelect';

import CommonNavbarMenuSearchItem from '@shop/components/Common/Navbar/Menu/Search/Item';
import CommonNavbarMenuSearchDropdown from '@shop/components/Common/Navbar/Menu/Search/Dropdown';
import CommonNavbarMenuCartItem from '@shop/components/Common/Navbar/Menu/Cart/Item';

const CommonNavbarRight = () => {
  const { lang } = useLocale();
  const c = useCurrency();
  return (
    <nav className="uk-navbar-right">
      <ul className="uk-navbar-nav">
        <li className="uk-visible@m">
          <a href="#">
            <span>
              {lang} / {c.code}
            </span>
            <span
              className="uk-margin-xsmall-left"
              uk-icon="icon: chevron-down; ratio: .75;"
            />
          </a>
          <div
            className="uk-navbar-dropdown"
            uk-dropdown="mode: click; offset: 0"
          >
            <ul className="uk-nav uk-navbar-dropdown-nav">
              <LocaleListItems withCode />
              <li className="uk-nav-divider" />
              <CurrencyListItems withCode />
            </ul>
          </div>
        </li>
        <li className="uk-navbar-item uk-hidden@m">
          <LocaleSelect withCode />
        </li>
        <li className="uk-navbar-item uk-hidden@m uk-padding-remove-left">
          <CurrencySelect withCode />
        </li>
      </ul>
      <CommonNavbarMenuSearchItem />
      <CommonNavbarMenuSearchDropdown />
      <CommonNavbarMenuCartItem />
    </nav>
  );
};

export default CommonNavbarRight;
