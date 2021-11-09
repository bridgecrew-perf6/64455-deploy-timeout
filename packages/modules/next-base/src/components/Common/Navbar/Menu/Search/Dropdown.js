import { useRef } from 'react';

import { useSearchForm, useTranslation } from '@foundation/next';

const CommonNavbarMenuSearchDropdown = () => {
  const { t } = useTranslation();

  const dropRef = useRef();

  const [query, onChange, onSubmit] = useSearchForm('/shop/categories', {
    defaultToQuery: true,
    onAfterSubmit: () => {
      if (dropRef.current && window.UIkit) UIkit.drop(dropRef.current).hide();
    },
    onComplete: (query, isOnPage, reset) => {
      reset();
    },
  });

  return (
    <div
      ref={dropRef}
      className="uk-navbar-dropdown uk-padding-small uk-margin-remove"
      uk-drop="mode: click; cls-drop: uk-navbar-dropdown;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x"
    >
      <div className="uk-container">
        <div className="uk-grid-small uk-flex-middle" uk-grid="true">
          <div className="uk-width-expand">
            <form
              className="uk-search uk-search-navbar uk-width-1-1"
              onSubmit={onSubmit}
            >
              <input
                className="uk-search-input"
                type="search"
                value={query}
                placeholder={t('common:search.placeholder')}
                onChange={onChange}
                autoFocus
              />
            </form>
          </div>
          <div className="uk-width-auto">
            <a className="uk-navbar-dropdown-close" href="#" uk-close="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonNavbarMenuSearchDropdown;
