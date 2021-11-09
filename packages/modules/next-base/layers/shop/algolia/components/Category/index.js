import CategorySidebar from '@shop/components/Category/Sidebar';
import CategoryProductList from '@shop/components/Category/Product/List';

const CategoryPage = props => (
  <div className="uk-grid-medium" uk-grid="true">
    {/* Filters */}
    <CategorySidebar {...props} />
    {/* Content */}
    <div className="uk-width-expand">
      <CategoryProductList {...props} />
    </div>
  </div>
);

export default CategoryPage;
