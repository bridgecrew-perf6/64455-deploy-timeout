import ProductCard from '@shop/components/Product/Card';

const ProductListItems = () => (
  <div>
    <div
      className="uk-grid-collapse uk-child-width-1-3 tm-products-grid js-products-grid"
      uk-grid="true"
    >
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
  </div>
);

export default ProductListItems;
