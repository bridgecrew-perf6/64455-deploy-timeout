import CatalogNav from '@shop/components/Catalog/Nav';
import CatalogCategories from '@shop/components/Catalog/Categories';

const CatalogPage = () => (
  <div className="uk-grid-medium" uk-grid="true">
    {/* Navigation */}
    <CatalogNav />
    {/* Categories */}
    <CatalogCategories />
  </div>
);

export default CatalogPage;
