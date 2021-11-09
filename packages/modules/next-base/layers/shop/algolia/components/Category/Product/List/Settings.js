import { useTranslation } from '@foundation/next';

import HitsPerPage from '@shop/components/Algolia/Widgets/HitsPerPage';
import SortBy from '@shop/components/Algolia/Widgets/SortBy';
import StateResults from '@shop/components/Algolia/Widgets/StateResults';

import shopConfig from '@app/config/shop';

const listOptions = shopConfig?.list ?? {};

const colWidth =
  Array.isArray(listOptions.sortByOptions) && listOptions.sortByOptions.length
    ? 'uk-width-1-1'
    : 'uk-width-1-2';

const OptionWrapper = ({ children }) => <li>{children}</li>;

const ProductListSettings = ({ mode, setMode }) => {
  const { t } = useTranslation();

  return (
    <div className="uk-card-header">
      <div className="uk-grid-small uk-flex-middle" uk-grid="true">
        {/* Sorting */}
        <div
          className={`${colWidth} uk-width-auto@s uk-flex uk-flex-center uk-flex-left@s uk-text-small`}
        >
          <ul className="uk-subnav uk-margin-remove tm-margin-remove-first">
            <SortBy {...listOptions} wrapperComponent={OptionWrapper} />
            <HitsPerPage {...listOptions} wrapperComponent={OptionWrapper} />
          </ul>
        </div>
        {/* Stats */}
        <div className="uk-width-1-1 uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-flex-first@s uk-text-small">
          <StateResults />
        </div>
        {/* Filters button & change view */}
        <div
          className={`${colWidth} uk-width-auto@s uk-flex uk-flex-center uk-flex-middle uk-flex-first uk-flex-last@s`}
        >
          {/* Filters button */}
          <button
            className="uk-button uk-button-default uk-button-small uk-width-1-1 uk-hidden@m"
            uk-toggle="target: #filters"
            type="button"
          >
            <span
              className="uk-margin-xsmall-right"
              uk-icon="icon: settings; ratio: .75;"
            />
            {t('shop:filtersHeader')}
          </button>
          {/* Change view */}
          <div className="tm-change-view uk-margin-small-left">
            <ul className="uk-subnav uk-iconnav">
              <li
                className={mode === 'grid' ? 'uk-active' : null}
                suppressHydrationWarning
              >
                <a
                  uk-icon="grid"
                  uk-tooltip={t('shop:viewAsGrid')}
                  onClick={() => setMode('grid')}
                />
              </li>
              <li
                className={mode === 'list' ? 'uk-active' : null}
                suppressHydrationWarning
              >
                <a
                  uk-icon="list"
                  uk-tooltip={t('shop:viewAsList')}
                  onClick={() => setMode('list')}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSettings;
