import { useRef } from 'react';
import { useTranslation } from '@foundation/next';

import LocaleListItems from '@foundation/components/LocaleList/Items';
import CurrencyListItems from '@foundation/components/CurrencyList/Items';

import Links from './Links';

export default function OffCanvas() {
  const ref = useRef();
  const { t } = useTranslation();

  function onClick() {
    if (ref.current) {
      setTimeout(() => UIkit.offcanvas(ref.current).hide(), 300);
    }
  }

  return (
    <>
      <div
        id="offcanvas"
        className="uk-offcanvas"
        ref={ref}
        uk-offcanvas="mode: push; overlay: true; container: #__next"
        onClick={onClick}
      >
        <div className="uk-offcanvas-bar">
          <button
            className="uk-offcanvas-close"
            type="button"
            uk-close=""
          ></button>
          <div className="uk-panel">
            <ul className="uk-nav uk-nav-default">
              <li className="uk-nav-header">Site</li>
              <Links />
            </ul>
            <ul className="uk-nav uk-nav-default uk-margin-top">
              <li className="uk-nav-header">{t('common:language')}</li>
              <LocaleListItems />
              <li className="uk-nav-header">{t('common:currency')}</li>
              <CurrencyListItems />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
