import BrandsSectionNav from '@shop/components/Brands/Section/Nav';
import BrandsSection from '@shop/components/Brands/Section';

const BrandsPage = () => (
  <div className="uk-card uk-card-default tm-ignore-container">
    <header className="uk-card-header uk-background-default">
      <BrandsSectionNav />
    </header>
    <BrandsSection />
  </div>
);

export default BrandsPage;
