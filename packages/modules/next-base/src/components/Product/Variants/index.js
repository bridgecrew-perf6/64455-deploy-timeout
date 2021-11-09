import ProductVariant from '@shop/components/Product/Variants/Variant';

const ProductVariants = props => {
  const { properties = [] } = props.variants;
  if (properties.length > 0) {
    return (
      <>
        <div className="uk-margin">
          <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
            {properties.map(option => (
              <ProductVariant key={option._id} {...option} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default ProductVariants;
