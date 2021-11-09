import ProductDetails from '@shop/components/Product/Details';

const ProductPage = props => {
  return (
    <>
      <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
        <ProductDetails {...props} />
      </div>
    </>
  );
};

export default ProductPage;
