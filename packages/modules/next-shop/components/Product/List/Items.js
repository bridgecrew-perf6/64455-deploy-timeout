import ProductCard from '@shop/components/Product/Card';

const ProductListItems = ({ mode = 'grid' }) => {
  return (
    <div>
      <div
        className={`uk-grid uk-grid-collapse uk-child-width-1-3 tm-products-${mode}`}
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
};

export default ProductListItems;
