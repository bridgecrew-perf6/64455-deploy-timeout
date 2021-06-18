import ProductVariant from '@shop/components/Product/Variants/Variant';

const ProductVariants = () => (
  <div className="uk-margin">
    <div className="uk-grid-medium" uk-grid="true">
      <ProductVariant title="Color" type="color" />
      <ProductVariant title="Size" />
    </div>
  </div>
);

export default ProductVariants;
