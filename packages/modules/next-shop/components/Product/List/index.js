import ProductListSettings from '@shop/components/Product/List/Settings';
import ProductListItems from '@shop/components/Product/List/Items';
import ProductListMore from '@shop/components/Product/List/More';
import ProductListPagination from '@shop/components/Product/List/Pagination';

const ProductList = () => (
  <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
    {/* Items */}
    <div>
      <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
        <div
          className="uk-grid-collapse uk-child-width-1-1"
          id="products"
          uk-grid="true"
        >
          {/* Settings */}
          <ProductListSettings></ProductListSettings>
          {/* Items */}
          <ProductListItems></ProductListItems>
          {/* Load more */}
          <ProductListMore></ProductListMore>
        </div>
      </div>
    </div>
    {/* Pagination */}
    <ProductListPagination></ProductListPagination>
  </div>
);

export default ProductList;
