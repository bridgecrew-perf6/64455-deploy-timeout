import ProductInfoBrand from '@shop/components/Product/Info/Brand';

const ProductInfoHeader = props => {
  const { item } = props;
  return (
    <div className="tm-product-header">
      <h2 className="uk-heading-xsmall uk-margin-small">{item.name}</h2>
      {item.brand && <ProductInfoBrand {...props} />}
    </div>
  );
};

export default ProductInfoHeader;
