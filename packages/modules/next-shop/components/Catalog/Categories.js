import CatalogSection from '@shop/components/Catalog/Section';

const CatalogCategories = () => (
  <div className="uk-width-1-1 uk-width-expand@m">
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      <CatalogSection />
      <CatalogSection />
      <CatalogSection />
      <CatalogSection />
      <CatalogSection />
    </div>
  </div>
);

export default CatalogCategories;
