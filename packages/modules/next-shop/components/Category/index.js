import CategorySidebar from '@shop/components/Category/Sidebar';
import ProductList from '@shop/components/Product/List';

const CategoryPage = () => (
  <div className="uk-grid-medium" uk-grid="true">
    {/* Filters */}
    <CategorySidebar />
    {/* Content */}
    <div className="uk-width-expand">
      <ProductList />
    </div>
  </div>
);

export default CategoryPage;
