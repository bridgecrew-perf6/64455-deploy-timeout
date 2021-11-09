import ProductCategoryListSettings from '@shop/components/Category/Product/List/Settings';
import ProductCategoryListItems from '@shop/components/Category/Product/List/Items';
import AlgoliaWidgetsPagination from '@shop/components/Algolia/Widgets/Pagination';

import { useUserPreference } from '@app/hooks/preferences';

const modes = ['grid', 'list'];

const CategoryProductList = () => {
  const [mode, updateMode] = useUserPreference('listViewMode', modes, 'grid');

  return (
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      {/* Items */}
      <div>
        <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
          <div className="uk-grid-collapse uk-child-width-1-1" uk-grid="true">
            {/* Settings */}
            <ProductCategoryListSettings mode={mode} setMode={updateMode} />
            {/* Items */}
            <ProductCategoryListItems mode={mode} />
            {/* Pagination */}
            <div className="uk-line-height uk-padding-small">
              <AlgoliaWidgetsPagination scrollToTop />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductList;
