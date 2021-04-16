import ProductOverview from '@shop/components/Product/Overview';
import ProductSpecifications from '@shop/components/Product/Specifications';
import ProductAccessories from '@shop/components/Product/Accessories';
import ProductReviews from '@shop/components/Product/Reviews';
import ProductQuestions from '@shop/components/Product/Questions';

const ProductDescriptionBody = () => (
  <div className="uk-card-body">
    <div className="uk-switcher js-product-switcher js-tabs">
      {/* Overview */}
      <ProductOverview></ProductOverview>
      {/* Specifications */}
      <ProductSpecifications></ProductSpecifications>
      {/* Accessories */}
      <ProductAccessories></ProductAccessories>
      {/* Reviews */}
      <ProductReviews></ProductReviews>
      {/* Q&A */}
      <ProductQuestions></ProductQuestions>
    </div>
  </div>
);

export default ProductDescriptionBody;
