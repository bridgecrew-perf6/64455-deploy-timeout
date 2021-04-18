import ProductListSettings from '@shop/components/Product/List/Settings';
import ProductListItems from '@shop/components/Product/List/Items';
import ProductListMore from '@shop/components/Product/List/More';
import ProductListPagination from '@shop/components/Product/List/Pagination';

import { useState } from 'react';

const ProductList = () => {
  const [mode, setMode] = useState('grid');

  return (
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      {/* Items */}
      <div>
        <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
          <div className="uk-grid-collapse uk-child-width-1-1" uk-grid="true">
            {/* Settings */}
            <ProductListSettings
              mode={mode}
              setMode={setMode}
            ></ProductListSettings>
            {/* Items */}
            <ProductListItems mode={mode}></ProductListItems>
            {/* Load more */}
            <ProductListMore></ProductListMore>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <ProductListPagination></ProductListPagination>
    </div>
  );
};

export default ProductList;
