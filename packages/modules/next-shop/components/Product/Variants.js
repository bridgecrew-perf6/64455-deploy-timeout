import ProductVariant from '@shop/components/Product/Variant';

const ProductVariants = () => (
  <div className="uk-margin">
    <div className="uk-grid-medium" uk-grid="true">
      <ProductVariant></ProductVariant>
      <ProductVariant></ProductVariant>
    </div>
  </div>
);

export default ProductVariants;
