import { useTranslation } from '@foundation/next';

import ProductListInfo from '@shop/components/Category/Product/List/Info';

const ProductListSettings = ({ query, mode, setMode }) => {
  const { t } = useTranslation();

  return (
    <div className="uk-card-header">
      <div className="uk-grid-small uk-flex-middle" uk-grid="true">
        <div className="uk-width-1-1 uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-flex-first@s uk-text-small">
          <ProductListInfo query={query} />
        </div>
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
  );
};

export default ProductListSettings;
