import ProductCard from '@shop/components/Product/Card';

const ProductAccessories = () => (
  <section>
    <div className="tm-expand">
      <div
        className="uk-grid-collapse uk-child-width-1-3@s uk-child-width-1-4@m tm-products-grid"
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
  </section>
);

export default ProductAccessories;
