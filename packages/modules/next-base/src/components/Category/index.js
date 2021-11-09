import CategoryProductList from '@shop/components/Category/Product/List';

const CategoryPage = props => (
  <div className="uk-grid-medium" uk-grid="true">
    <div className="uk-width-expand">
      <CategoryProductList {...props} />
    </div>
  </div>
);

export default CategoryPage;
