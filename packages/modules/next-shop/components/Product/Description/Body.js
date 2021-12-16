import ProductOverview from '@shop/components/Product/Overview';
import ProductSpecifications from '@shop/components/Product/Specifications';
import ProductAccessories from '@shop/components/Product/Accessories';
import ProductReviews from '@shop/components/Product/Reviews';
import ProductQuestions from '@shop/components/Product/Questions';

const ProductDescriptionBody = () => (
  <div className="uk-card-body">
    <div className="uk-switcher js-product-switcher js-tabs">
      {/* Overview */}
      <ProductOverview />
      {/* Specifications */}
      <ProductSpecifications />
      {/* Accessories */}
      <ProductAccessories />
      {/* Reviews */}
      <ProductReviews />
      {/* Q&A */}
      <ProductQuestions />
    </div>
  </div>
);

export default ProductDescriptionBody;
