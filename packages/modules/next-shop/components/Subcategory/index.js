import SubcategorySidebar from '@shop/components/Subcategory/Sidebar';
import ProductList from '@shop/components/Product/List';

const SubcategoryPage = () => (
  <div className="uk-grid-medium" uk-grid="true">
    {/* Filters */}
    <SubcategorySidebar></SubcategorySidebar>
    {/* Content */}
    <div className="uk-width-expand">
      <ProductList></ProductList>
    </div>
  </div>
);

export default SubcategoryPage;
