import CatalogSectionHeader from '@shop/components/Catalog/Section/Header';
import CatalogSectionBody from '@shop/components/Catalog/Section/Body';

const CatalogSection = () => (
  <section id="laptops-tablets">
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      {/* Header */}
      <CatalogSectionHeader />
      {/* Body */}
      <CatalogSectionBody />
    </div>
  </section>
);

export default CatalogSection;
